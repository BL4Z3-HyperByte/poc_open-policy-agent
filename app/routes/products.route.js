const {
  productController,
  productDetailsContoller,
} = require('../contollers/product.contoller');
const PolicyGuard = require('../middleware/opa');

const productsRouter = require('express').Router();

productsRouter.get('/products', PolicyGuard, productController);

productsRouter.get('/products/:id', PolicyGuard, productDetailsContoller);

module.exports = { productsRouter };
