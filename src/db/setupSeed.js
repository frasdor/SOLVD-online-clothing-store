const fs = require('fs');
const client = require('../db/client');
require('dotenv').config({ path: __dirname + '/../../.env' });


async function seedDatabase() {
  try {
    const sql = fs.readFileSync(__dirname + '/seed.sql').toString();
    await client.query(sql);

    console.log('✅Database has been seeded successfully!');
  } catch (err) {
    console.error('❌Error while seeding the database:', err);
  } 
}

seedDatabase();
