const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');

router
  .get('/', salesController.sales);

module.exports = router;
