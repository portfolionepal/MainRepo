const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

/**
 * Parse a MySQL connection URL into individual components.
 * Supports: mysql://user:password@host:port/database
 */
function parseDatabaseUrl(url) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port, 10) || 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace('/', ''),
  };
}

let pool;

function getPool() {
  if (pool) return pool;

  let config;

  if (process.env.DATABASE_URL) {
    config = parseDatabaseUrl(process.env.DATABASE_URL);
  } else {
    config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
    };
  }

  // Check for optional SSL certificate (ca.pem)
  const caPath = path.join(__dirname, '..', 'ca.pem');
  if (fs.existsSync(caPath)) {
    config.ssl = {
      ca: fs.readFileSync(caPath),
      rejectUnauthorized: false,
    };
  }

  // Connection pool settings
  config.waitForConnections = true;
  config.connectionLimit = 10;
  config.queueLimit = 0;
  // Return JS dates instead of strings
  config.dateStrings = false;
  // Ensure JSON columns are returned as strings (we parse them ourselves)
  config.typeCast = function (field, next) {
    if (field.type === 'JSON') {
      const val = field.string();
      if (val === null) return null;
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return next();
  };

  pool = mysql.createPool(config);
  return pool;
}

module.exports = { getPool };
