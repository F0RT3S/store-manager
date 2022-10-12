const productModel = require('../models/products.model');

const listAll = async () => {
  const result = await productModel.listAll(); // Função do model
  return result;
};

const listById = async (id) => {
  const result = await productModel.listById(id);
  return result;
};

module.exports = {
  listAll,
  listById,
};