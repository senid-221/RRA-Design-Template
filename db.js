const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

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

    // Create admin_users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);

    // Create videos table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500),
        category VARCHAR(100),
        duration VARCHAR(50),
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        project_url VARCHAR(500),
        category VARCHAR(100),
        tags TEXT,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create shop_products table (web previews for selling)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shop_products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        currency VARCHAR(10) DEFAULT 'RWF',
        image_url VARCHAR(500),
        preview_url VARCHAR(500),
        demo_url VARCHAR(500),
        category VARCHAR(100),
        features TEXT,
        technologies TEXT,
        display_order INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create site_content table for general editable content
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content_key VARCHAR(255) UNIQUE NOT NULL,
        content_value TEXT,
        content_type VARCHAR(50) DEFAULT 'text',
        page VARCHAR(100),
        section VARCHAR(100),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Bootstrap an administrator only when explicit deployment credentials are provided.
    // Never create a publicly documented default password.
    const initialAdminUsername = process.env.ADMIN_INITIAL_USERNAME || '';
    const initialAdminPassword = process.env.ADMIN_INITIAL_PASSWORD || '';
    const initialAdminEmail = process.env.ADMIN_INITIAL_EMAIL || '';
    if (initialAdminUsername && initialAdminPassword && initialAdminEmail) {
      if (initialAdminPassword.length < 12) {
        console.warn('Admin bootstrap skipped: ADMIN_INITIAL_PASSWORD must be at least 12 characters.');
      } else {
        const adminExists = await pool.query('SELECT id, password_hash FROM admin_users WHERE username = $1', [initialAdminUsername]);
        const hash = await bcrypt.hash(initialAdminPassword, 12);
        if (adminExists.rows.length === 0) {
          await pool.query(
            `INSERT INTO admin_users (username, password_hash, email, role)
             VALUES ($1, $2, $3, $4)`,
            [initialAdminUsername, hash, initialAdminEmail, 'super_admin']
          );
        } else if (
          initialAdminUsername === 'admin'
          && await bcrypt.compare('admin123', adminExists.rows[0].password_hash)
        ) {
          // One-time recovery for databases created with the old, publicly documented default.
          await pool.query('UPDATE admin_users SET password_hash = $1, email = $2 WHERE id = $3', [
            hash, initialAdminEmail, adminExists.rows[0].id
          ]);
          console.warn('Replaced legacy default admin password using ADMIN_INITIAL_PASSWORD.');
        }
      }
    } else {
      console.warn('Admin bootstrap skipped: configure ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_PASSWORD, and ADMIN_INITIAL_EMAIL for a new database.');
    }

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
