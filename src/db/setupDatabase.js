const fs = require('fs');
const client = require('../db/client');
require('dotenv').config({ path: __dirname + '/../../.env' }); // to use .env variables


async function setupDatabase() {
  try {
    const sql = fs.readFileSync(__dirname + '/schema.sql').toString();
    await client.query(sql);

    console.log('✅Database has been created successfully!');
  } catch (err) {
    console.error('❌Error while creating the database:', err);
  } 
}

setupDatabase();
