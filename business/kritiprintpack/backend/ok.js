require('dotenv').config();
const mysql = require('mysql2/promise');
async function test() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ MySQL connection successful');
    await connection.end();
  } catch (error) {
    console.error('❌ MySQL error:', error.message);
  }
}
test();