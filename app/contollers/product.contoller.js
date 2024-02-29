const Product = require('../repos/product');
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
async function productController(req, res, next) {
  console.group('PRODCUTS '.padEnd(50, '='));
  console.log(req.headers);
  console.log(req.url);

  const products = [...Array(10)].map((_, i) => {
    return new Product();
  });

  console.log(JSON.stringify(products, null, 4));
  res.status(200).json({
    products: products.map((product) => {
      return req.filterData(product);
    }),
  });
  console.groupEnd();
}

async function productDetailsContoller(req, res, next) {
  console.group('PRODUCT DETAILS '.padEnd(50, '='));
  console.log(req.headers);
  console.log(req.url);

  const product = new Product(req.params.id);
  console.log(product);
  res.status(200).json({ product: req.filterData(product) });
  console.groupEnd();
}

module.exports = { productController, productDetailsContoller };
