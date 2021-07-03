const { Blog } = require('../models');

const blogData = [
  {
    title: 'Awesome Blog',
    body: 'This is an awesome blog',
    uid: 1
  }
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;