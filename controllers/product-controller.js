const ProductModel = require('../models/product-model')

class ProductController {
    async addProduct(req, res) {
        try {
            const {name, img, description, cost} = req.body;
            const product = await ProductModel.create({name, img, description, cost, count})
            return res.json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    
    async findProduct(req, res) {
        try {
            const {name} = req.body
            const product = await ProductModel.findOne({name})
            return res.json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    
    async getProducts(req, res) {
        try {
            const products = await ProductModel.find()
            return res.json(products)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getProduct(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('ID is not found')
            }
            const product = await ProductModel.findById(id)
            return res.json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new ProductController();