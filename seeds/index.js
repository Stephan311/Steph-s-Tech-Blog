const sequelize = require('../config/connection');
const seedBlogs = require('./blog-seeds');

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedBlogs();
    console.log('\n----- BLOG SEEDED -----\n');

    process.exit(0);
};


seedAll();
