const productModel = require('../models/products.model');

const listAll = async () => {
  const result = await productModel.listAll(); // Função do model
  return result;
};

const listById = async (id) => {
  const result = await productModel.listById(id);
  return result;
};

const createProduct = async (name) => {
  const newProduct = await productModel.createProduct(name);
  return newProduct;
};

const updateProduct = async (id, name) => {
  const result = await productModel.updateProduct(id, name);
  return result;
};

module.exports = {
  listAll,
  listById,
  createProduct,
  updateProduct,
};