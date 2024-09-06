const { productModel } = require('../../models/products.model')


class ProductManagerMongo {
    constructor(){
        this.model = productModel
    }

    getProducts = async () => await this.model.find({}).lean()
    getProductsAgg = async (sort) => {
        const sortOrder = sort === 'desc' ? -1 : 1
    
        const pipeline = []
        
        if (!sort) {
            return await this.model.find({}).lean();
        }
    
        // Si se proporciona sort, ordenar por price
        return await this.model.aggregate([
            { $sort: { price: sortOrder } }
        ]).exec();
        
    }
    getProductsPag = async (opc) => await this.model.paginate({}, opc)
    getProduct = async opts => await this.model.findOne(opts)
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne(opts)
    updateProduct = async opts => await this.model.updateOne(opts)
    
}

module.exports = {ProductManagerMongo}