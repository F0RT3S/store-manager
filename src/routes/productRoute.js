const express = require('express');

const router = express.Router();

const productController = require('../controllers/products.controller');

router
  .get('/', productController.listAll)
  .post('/', productController.createProduct);

router.get('/:id', productController.listById);

module.exports = router;