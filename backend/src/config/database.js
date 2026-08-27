const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'alegui',
  password: 'everson12345!',
  port: 5432,
});

module.exports = pool;