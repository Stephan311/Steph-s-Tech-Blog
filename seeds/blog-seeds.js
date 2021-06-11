const { Blog } = require('../models')

const blogData = [
    {
        title: 'Test Blog',
        body: 'This is a test',
        author: 'Jeff'
    }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;