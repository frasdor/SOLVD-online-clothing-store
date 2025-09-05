const bcrypt = require('bcrypt');

const users = [
    { id: 1, username: 'user', password: bcrypt.hashSync('pass', 10) },
    { id: 2, username: 'admin', password: bcrypt.hashSync('admin123', 10) }
];

module.exports = users;
