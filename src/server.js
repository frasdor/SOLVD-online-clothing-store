const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
