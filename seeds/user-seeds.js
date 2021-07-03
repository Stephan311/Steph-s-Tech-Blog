const {User} = require('../models');

const userData = [
    {
        username: 'Stephan311',
        email: 'john@example.com',
        password: '12345678910',
        blogId: 1


    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;