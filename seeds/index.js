const sequelize = require('../config/connection');
const seedBlog = require('./blog-seed')
const seedUsers = require('./user-seeds')

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedBlog();
    console.log('\n----- BLOGS SEEDED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    

    process.exit(0);
};


seedAll();