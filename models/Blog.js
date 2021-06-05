// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'dish'
      }
);

module.exports = Blog;