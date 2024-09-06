const { Router } = require('express')
const {ProductManagerMongo} = require('../daos/MONGO/productManager.mongo')
const { CartsManagerMongo } = require('../daos/MONGO/cartsManager.mongo')


const router = Router()

const productService = new ProductManagerMongo()
const cartService = new CartsManagerMongo() 

//Vista Home con Handlerbars
router.get('/products', async (req, res)=>{
    try {
        const page = req.query.page || 1
        const limit = 3
        
        const productDb = await productService.getProductsPag({ limit, page })
        
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

//vista Base - (le puse la Home para que tenga algo)
router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 3
        
        const productDb = await productService.getProductsPag({ limit, page })
        
        res.render('home', {
            title: '2da Entrega',
            products: productDb
        })

    } catch (error) {
        console.log(error)
    }

})


//vista Carrito
router.get('/cart/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const productCarts = await cartService.getCartPopu({_id: cid})
        res.render('cart', {
            title: 'Carrito de compras',
            products: productCarts
        })
        
    } catch (error) {
        console.log(error)
    }    
})


module.exports = router