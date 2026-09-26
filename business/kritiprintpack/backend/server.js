const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const app = require('./app');

// Load env vars
dotenv.config();






// Load env vars
const result = dotenv.config();

console.log('🔍 ENV DEBUG');
console.log('dotenv loaded:', !result.error);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ Missing');
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});
