const {User} = require('../models');

const userData = [
    {
        username: 'Stephan311',
        email: 'john@example.com',
        password: '12345678910'


    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;