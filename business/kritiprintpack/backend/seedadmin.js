const dotenv = require('dotenv');
dotenv.config();
const { getPool } = require('./config/db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  const pool = getPool();
  try {
    // Create AdminUser table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS AdminUser (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(191) NOT NULL,
        password VARCHAR(191) NOT NULL,
        name VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY AdminUser_email_key (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    const adminEmail = 'admin@kritiprintpack.com';
    const adminPassword = 'admin123'; // The plain text password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const [existing] = await pool.execute(
      'SELECT * FROM AdminUser WHERE email = ? LIMIT 1',
      [adminEmail]
    );

    if (existing.length > 0) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    await pool.execute(
      'INSERT INTO AdminUser (email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [adminEmail, hashedPassword, 'Admin']
    );

    console.log(
      `Admin user created successfully with email: ${adminEmail} and password: ${adminPassword}`
    );
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();