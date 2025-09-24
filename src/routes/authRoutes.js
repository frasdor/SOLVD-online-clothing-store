const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createJWT } = require('../auth/jwt');
const client = require('../db/client');



// LOGIN
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE email=$1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(401).send('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Invalid credentials');

        const token = createJWT({ userId: user.id, email: user.email });
        res.json({
            message: "Login successful",
            token: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// REGISTER
router.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name, email, hashedPassword]
        );

        const newUser = result.rows[0];

        const token = createJWT({ userId: newUser.id, email: newUser.email });

        res.status(201).json({
            message: "Registration successful",
            user: newUser,
            token: token
        });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { 
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Server error');
        }
    }
});


module.exports = router;
