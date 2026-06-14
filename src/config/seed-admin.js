const bcrypt = require('bcryptjs');
const { pool } = require('./db');

const seedAdmin = async () => {
  const adminEmail = 'admin@skippr.com';
  const adminPassword = 'Admin@123';
  const adminName = 'Skippr Admin';
  const adminRole = 'Admin';
  const adminMobile = '9999900000';

  try {
    // Check if admin already exists
    const existingAdmin = await pool.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
    
    if (existingAdmin.rows.length > 0) {
      console.log(`Admin with email ${adminEmail} already exists. Skipping...`);
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Insert admin user
    await pool.query(
      'INSERT INTO users (name, email, password, role, mobile) VALUES ($1, $2, $3, $4, $5)',
      [adminName, adminEmail, hashedPassword, adminRole, adminMobile]
    );

    console.log('-----------------------------------');
    console.log('ADMIN SEEDED SUCCESSFULLY');
    console.log('-----------------------------------');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-----------------------------------');
    console.log('Note: Admin cannot self-register. Use these credentials to login.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
