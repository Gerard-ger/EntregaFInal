const { Router } = require('express')
const {ProductManagerMongo} = require('../daos/MONGO/productManager.mongo')

const router = Router()

const productService = new ProductManagerMongo()

//Vista Home con Handlerbars
router.get('/home', async (req, res)=>{
    try {
        const productDb = await productService.getProducts()
        res.render('home', {
            title: '2da Entrega',
            products: productDb
        })
        
    } catch (error) {
        console.log(error)
    }    
})

//Vista de RealtimeProducts
router.get('/realtimeproducts', (req, res) => {

    res.render('realTimeProducts', {
        title: '2da Entrega - Realtime Product',
    })
})

router.get('/', async (req, res) => {
    try {
        const products = await productService.getProducts()
        res.send({ status: 'success', data: products })

    } catch (error) {
        console.log(error)
    }

})


module.exports = router