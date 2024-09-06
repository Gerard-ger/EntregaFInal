const { Router } = require('express')
const {ProductManagerMongo} = require('../../daos/MONGO/productManager.mongo.js')

const router = Router()
const productService = new ProductManagerMongo()

//Mostrar product
router.get('/', async (req, res) => {
    try {
        const { sort } = req.query
        const products = await productService.getProductsAgg(sort)
        res.send({ status: 'success', data: products })

    } catch (error) {
        console.log(error)
    }

})

//Mostrar productos por ID
router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const productID = await productService.getProduct({_id: pid})
        res.send({ status: 'success', data: productID })

    } catch (error) {
        console.log(error)
    }

})

//Agregar producto
router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await productService.createProduct(body)
        res.send({ status: 'success', data: response })

    } catch (error) {
        console.log(error)
    }

})

//Actualizar producto por ID
router.put('/:pid', async (req, res) => {
    try {
        const body = req.body
        const pid = req.params.pid
        const objAActualizar= {_id: pid, ...body}
        const response = await productService.updateProduct(objAActualizar)
        res.send({ status: 'success', data: response })

    } catch (error) {
        console.log(error)
    }

})

//Borrar producto por ID
router.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const response = await productService.deleteProduct({_id: pid})
        res.send({ status: 'success', data: response })
    } catch (error) {
        console.log(error)
    }

})



module.exports = router