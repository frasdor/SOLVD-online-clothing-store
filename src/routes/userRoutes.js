const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../auth/jwt');

router.get('/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Missing token');

    try {
        const token = authHeader.split(' ')[1];
        const payload = verifyJWT(token);
        res.json({ message: 'Protected data', user: payload });
    } catch (err) {
        res.status(401).send(err.message);
    }
});

module.exports = router;
