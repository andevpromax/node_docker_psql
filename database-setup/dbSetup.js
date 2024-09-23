const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'db',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'postgres',
  port: 5432,
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      age INT
    )
  `;
  try {
    await pool.query(query);
    console.log('Таблиця "users" була створена або вже існує.');
  } catch (error) {
    console.error('Помилка при створенні таблиці:', error);
  } finally {
    await pool.end();
  }
};

createTable();
