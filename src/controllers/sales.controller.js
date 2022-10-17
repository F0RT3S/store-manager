const salesService = require('../services/sales.service');

const sales = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  const result = await salesService.sales(productId, quantity);
  return res.status(201).json(result);
};

module.exports = {
  sales,
};