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

  if (!name) {
    return res.status(400).json({ message: '"name" is required' }); 
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const newProduct = await productService.createProduct(name);
  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const resultId = await productService.listById(id);
  if (!resultId) return res.status(404).json({ message: 'Product not found' });

  const result = await productService.updateProduct(id, name);
  if (result) return res.status(200).json(result);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  
  const resultId = await productService.listById(id);
  if (!resultId) return res.status(404).json({ message: 'Product not found' });
  
  const result = await productService.deleteProducts(id); 
  if (id) return res.status(204).json(result);
};

module.exports = {
  listAll,
  listById,
  createProduct,
  updateProduct,
  deleteProducts,
};