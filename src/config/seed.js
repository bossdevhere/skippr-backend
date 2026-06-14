const { pool } = require('./db');

const services = [
  {
    name: 'Home Cleaning',
    description: 'Deep cleaning for your entire home including kitchen and bathrooms.',
    price: 80.00
  },
  {
    name: 'AC Repairing',
    description: 'Expert repair and maintenance for all types of air conditioners.',
    price: 50.00
  },
  {
    name: 'Plumbing',
    description: 'Professional plumbing services for leaks, clogs, and installations.',
    price: 45.00
  },
  {
    name: 'Electrical Services',
    description: 'Safe and reliable electrical repairs and wiring services.',
    price: 60.00
  },
  {
    name: 'Carpentry',
    description: 'Custom furniture repair and woodwork services.',
    price: 55.00
  }
];

const seedDB = async () => {
  try {
    // Clear existing services
    await pool.query('DELETE FROM services');
    console.log('Existing services cleared.');

    // Insert new services
    for (const service of services) {
      await pool.query(
        'INSERT INTO services (name, description, price) VALUES ($1, $2, $3)',
        [service.name, service.description, service.price]
      );
      console.log(`Seeded service: ${service.name}`);
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
