const productService = require('../services/products.service');

const listAll = async (_req, res) => {
  const result = await productService.listAll(); // Função do service
  return res.status(200).json(result);
};

const listById = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== 'string') return res.status(400).json({ message: 'id não é uma string' });
  const result = await productService.listById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  if (result) return res.status(200).json(result);
};

module.exports = {
  listAll,
  listById,
};