const { productModel } = require('../../models/products.model')


class ProductManagerMongo {
    constructor(){
        this.model = productModel
    }

    getProducts = async () => await this.model.find({}).lean()
    getProduct = async opts => await this.model.findOne(opts)
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne(opts)
    updateProduct = async opts => await this.model.updateOne(opts)
    
}

module.exports = {ProductManagerMongo}