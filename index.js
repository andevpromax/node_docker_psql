const express = require('express');
const app = express();
require('dotenv').config();

const { Pool } = require('pg');

let pool;

pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'db',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'postgres',
  port: 5432,
});

const port = 8080;

// body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('Success!');
});

app.post('/users', async (req, res) => {
  const { name, age } = req.body;
  const response = await pool.query(
    'INSERT INTO users (name, age) VALUES ($1, $2)',
    [name, age]
  );
  res.send('success');
});

app.get('/users', async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.send(response.rows);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
