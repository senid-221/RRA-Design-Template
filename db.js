const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.on('connect', () => {
  console.log('✓ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('✗ Unexpected database error:', err);
});

// Initialize database tables
const initDatabase = async () => {
  try {
    console.log('Attempting to connect to database...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Configured' : 'Not configured');
    
    // Test connection first
    const client = await pool.connect();
    console.log('✓ Database connection successful');
    client.release();
    
    // Create contacts table for FAQ contact form submissions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        tin VARCHAR(50),
        category VARCHAR(100) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'new'
      )
    `);

    // Create newsletter_subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `);

    console.log('✓ Database tables initialized');
  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
    console.error('Error details:', error);
  }
};

module.exports = {
  pool,
  initDatabase
};
