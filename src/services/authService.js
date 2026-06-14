const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const ApiError = require('../utils/apiError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.register = async (userData) => {
  const { name, email, password, role, mobile } = userData;

  // Check if user exists
  const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new ApiError(400, 'User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await db.query(
    'INSERT INTO users (name, email, password, role, mobile) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, mobile',
    [name, email, hashedPassword, role || 'Customer', mobile]
  );

  const token = signToken(newUser.rows[0].id);

  return { user: newUser.rows[0], token };
};

exports.login = async (email, password) => {
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user.rows[0].id);

  // Remove password from output
  delete user.rows[0].password;

  return { user: user.rows[0], token };
};
