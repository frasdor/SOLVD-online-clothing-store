const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('🚀 Connected to PostgreSQL!'))
  .catch(err => console.error('❌ Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
