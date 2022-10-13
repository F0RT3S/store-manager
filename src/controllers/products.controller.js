const productService = require('../services/products.service');

const listAll = async (_req, res) => {
  const result = await productService.listAll();
  return res.status(200).json(result);
};

const listById = async (req, res) => {
  const { id } = req.params;
  // if (typeof id !== 'string') return res.status(400).json({ message: 'id não é uma string' });
  const result = await productService.listById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  if (result) return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  if (name === '') {
    return res.status(422).json({ message: 'O campo de nome não pode ser vazio' }); 
  }

  const newProduct = await productService.createProduct(name);
  return res.status(201).json(newProduct);
};

module.exports = {
  listAll,
  listById,
  createProduct,
};