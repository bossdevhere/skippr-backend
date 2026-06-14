const db = require('../config/db');

exports.getStats = async (user) => {
  let whereClause = '';
  let params = [];

  if (user.role !== 'Admin') {
    whereClause = 'WHERE user_id = $1';
    params.push(user.id);
  }

  const stats = await db.query(
    `SELECT 
      COUNT(*) as total_bookings,
      COUNT(*) FILTER (WHERE status = 'Pending') as pending,
      COUNT(*) FILTER (WHERE status = 'Assigned') as assigned,
      COUNT(*) FILTER (WHERE status = 'Completed') as completed
     FROM bookings
     ${whereClause}`,
    params
  );

  return stats.rows[0];
};
