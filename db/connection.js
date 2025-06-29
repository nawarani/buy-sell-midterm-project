// PG database client/connection setup
const { Pool } = require('pg');

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// };
// const db = new Pool(dbParams);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


db.connect();

module.exports = db;
