const { Profit } = require('../../models');

const profitData = [
  {
    profit: 10.00,
    product_id: 1
  }
];

const seedProfit = () => Profit.bulkCreate(profitData);

module.exports = seedProfit;