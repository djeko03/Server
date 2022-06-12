const Router = require('express').Router;
const productController = require('../controllers/product-controller')


const productRouter = new Router();


productRouter.post('/add', productController.addProduct)
productRouter.get('/product', productController.findProduct)
productRouter.get('/products', productController.getProducts)
productRouter.get('/product/:id', productController.getProduct)


module.exports = productRouter