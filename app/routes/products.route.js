const {
  productController,
  productDetailsContoller,
} = require('../contollers/product.contoller');
const {
  PolicyGuard_Products,
  PolicyGuard_Details,
} = require('../middleware/opa');

const productsRouter = require('express').Router();

productsRouter.get('/products', PolicyGuard_Products, productController);

productsRouter.get(
  '/products/:id',
  PolicyGuard_Details,
  productDetailsContoller
);

module.exports = { productsRouter };
