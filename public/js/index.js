const sequelize = require('../../config/connection');
const seedBlogs = require('../../seeds/blog-seed');
const seedUsers = require('../../seeds/user-seeds')

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n')

    await seedBlogs();
    console.log('\n----- BLOG SEEDED -----\n');

    process.exit(0);
};


seedAll();
