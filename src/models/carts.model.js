const { Schema, model } = require('mongoose')

const collectionName = 'carts'

const cartsItemsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        default: 1
    }    
})

const cartsSchema = new Schema({
    products: [cartsItemsSchema]
})

const cartsModel = model(collectionName, cartsSchema)

module.exports = { cartsModel }