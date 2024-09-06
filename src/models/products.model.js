const { Schema, model } = require('mongoose')
const mongossePaginate = require('mongoose-paginate-v2')

const collectionName = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: Boolean,
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: String
})

productSchema.plugin(mongossePaginate)

const productModel = model(collectionName, productSchema)

module.exports = { productModel }