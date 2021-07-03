const User = require('./User');
const Blog = require('./Blog');

Blog.belongsTo(User, {
    foreignKey: 'uid',
})

User.hasMany(Blog)
    // foreignKey: {
    //   name: 'blog_id',
    // //   allowNull: false
//     }
//   })





module.exports = { Blog, User };
