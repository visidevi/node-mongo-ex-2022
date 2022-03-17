const Product = require('../models/product.model');
const ProductCtrl = require('../controllers/products.controller');
const routes = [
  {
    path: '/products',
    method: 'GET',
    handler: ProductCtrl.getProducts,
  },
  {
    path: '/products',
    method: 'POST',
    handler: ProductCtrl.create,
  },
  {
    url: '/products/:id',
    method: 'GET',
    handler: ProductCtrl.getProduct,
  },
  {
    url: '/products/:id',
    method: 'PUT',
    handler: ProductCtrl.updateProduct,
  },
  {
    url: '/products/:id',
    method: 'DELETE',
    handler: ProductCtrl.deleteProduct,
  },
];

module.exports = routes;
