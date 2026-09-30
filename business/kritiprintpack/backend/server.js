const dotenv = require('dotenv');

// Load env vars (before anything else that reads them)
dotenv.config();

const app = require('./app');
const { getPool } = require('./config/db');

console.log('🔍 ENV DEBUG');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ Missing');
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});
