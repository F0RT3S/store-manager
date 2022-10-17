const salesModel = require('../models/sales.model');

const sales = async (productId, quantity) => {
  const result = await salesModel.sales(productId, quantity);
  return result;
};

module.exports = {
  sales,
};