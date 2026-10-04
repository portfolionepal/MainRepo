require('dotenv').config();
const { getPool } = require('./config/db');

async function main() {
  const pool = getPool();
  try {
    console.log('Altering table ContactInfo...');
    await pool.execute('ALTER TABLE ContactInfo ADD COLUMN whatsappUrl VARCHAR(191), ADD COLUMN instagramUrl VARCHAR(191)');
    console.log('Columns added successfully.');
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error('Error:', error);
    }
  } finally {
    process.exit(0);
  }
}

main();
