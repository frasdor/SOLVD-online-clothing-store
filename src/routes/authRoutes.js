const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { createJWT } = require('../auth/jwt');
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid credentials');

    const token = createJWT({ userId: user.id, username: user.username });
    res.json({ token });
});

module.exports = router;
