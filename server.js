require('dotenv').config();
const app = require('./src/app');
const { pool } = require('./src/config/db');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000;

// Connect to DB and start server
const server = app.listen(port, async () => {
  try {
    // Test DB connection
    await pool.query('SELECT NOW()');
    console.log(`DB connection successful!`);
    console.log(`App running on port ${port}...`);
  } catch (err) {
    console.error('DB connection failed!', err);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
