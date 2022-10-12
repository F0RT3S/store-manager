const express = require('express');

const router = express.Router();

const productController = require('../controllers/products.controller');

router.get('/', productController.listAll);
router.get('/:id', productController.listById);

module.exports = router;