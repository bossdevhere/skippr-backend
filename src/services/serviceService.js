const db = require('../config/db');
const ApiError = require('../utils/apiError');

exports.getAllServices = async () => {
  const result = await db.query('SELECT * FROM services ORDER BY name ASC');
  return result.rows;
};

exports.getServiceById = async (id) => {
  const result = await db.query('SELECT * FROM services WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Service not found');
  }
  return result.rows[0];
};

exports.createService = async (serviceData) => {
  const { name, description, price } = serviceData;
  const result = await db.query(
    'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  return result.rows[0];
};

exports.updateService = async (id, serviceData) => {
  const { name, description, price } = serviceData;
  const result = await db.query(
    'UPDATE services SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
    [name, description, price, id]
  );
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Service not found');
  }
  return result.rows[0];
};

exports.deleteService = async (id) => {
  const result = await db.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Service not found');
  }
  return result.rows[0];
};
