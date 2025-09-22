const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: __dirname + '/../../.env' }); // to use .env variables

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'SOLVD_online_clothing_store',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('🚀Connected to PostgreSQL!');

    const sql = fs.readFileSync(__dirname + '/schema.sql').toString();
    await client.query(sql);

    console.log('Database has been created successfully!');
  } catch (err) {
    console.error('Error while creating the database:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
