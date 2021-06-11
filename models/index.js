const User = require('./User');
const Blog = require('./Blog');

//say what belongs to what here (18:31)
// Profit.belongsTo(Product, {
//     foreignKey: 'product_id',
// })

// Product.hasOne(Profit, {
//     foreignKey: 'product_id',
// })




module.exports = { Blog, User };
