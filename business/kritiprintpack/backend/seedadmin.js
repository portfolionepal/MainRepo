// const dotenv = require('dotenv');
// dotenv.config();
// const { getPool } = require('./config/db');
// const bcrypt = require('bcryptjs');

// const seedAdmin = async () => {
//   const pool = getPool();
//   try {
//     const adminEmail = 'admin@kritiprintpack.com';
//     const adminPassword = 'admin123'; // The plain text password
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     const [existing] = await pool.execute(
//       'SELECT * FROM AdminUser WHERE email = ? LIMIT 1',
//       [adminEmail]
//     );

//     if (existing.length > 0) {
//       console.log('Admin already exists.');
//       return;
//     }

//     await pool.execute(
//       'INSERT INTO AdminUser (email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
//       [adminEmail, hashedPassword, 'Admin']
//     );

//     console.log(
//       `Admin user created successfully with email: ${adminEmail} and password: ${adminPassword}`
//     );
//   } catch (error) {
//     console.error('Error seeding admin user:', error);
//   } finally {
//     await pool.end();
//   }
// };

// seedAdmin();