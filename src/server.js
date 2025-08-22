const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
