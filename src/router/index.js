const { Router } = require('express')
const productRouter = require('./api/products.router.js')
const cartRouter = require('./api/carts.router.js')
const viewsRouter = require('./views.router.js')

const router = Router()

//configuracion de Rutas
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/', viewsRouter)

module.exports = router