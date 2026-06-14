const db = require('../config/db');
const ApiError = require('../utils/apiError');

exports.createBooking = async (userId, bookingData) => {
  const { 
    service_id, 
    customer_name, 
    mobile, 
    unit_number, 
    service_name, 
    booking_date, 
    time_slot, 
    address 
  } = bookingData;

  const newBooking = await db.query(
    `INSERT INTO bookings (
      user_id, service_id, customer_name, mobile, unit_number, 
      service_name, booking_date, time_slot, address
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [userId, service_id, customer_name, mobile, unit_number, service_name, booking_date, time_slot, address]
  );

  return newBooking.rows[0];
};

exports.getAllBookings = async (user) => {
  let query = `
    SELECT * FROM bookings
  `;
  let params = [];

  if (user.role !== 'Admin') {
    query += ' WHERE user_id = $1';
    params.push(user.id);
  }

  query += ' ORDER BY created_at DESC';

  const bookings = await db.query(query, params);
  return bookings.rows;
};

exports.getBookingById = async (id, user) => {
  const booking = await db.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [id]
  );

  if (booking.rows.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  if (user.role !== 'Admin' && booking.rows[0].user_id !== user.id) {
    throw new ApiError(403, 'You do not have permission to view this booking');
  }

  return booking.rows[0];
};

exports.updateBookingStatus = async (id, status) => {
  const updatedBooking = await db.query(
    'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );

  if (updatedBooking.rows.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  return updatedBooking.rows[0];
};

exports.deleteBooking = async (id) => {
  const deletedBooking = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);

  if (deletedBooking.rows.length === 0) {
    throw new ApiError(404, 'Booking not found');
  }

  return deletedBooking.rows[0];
};
