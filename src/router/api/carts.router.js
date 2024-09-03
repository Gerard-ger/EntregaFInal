const { Router } = require ('express')
const { CartsManagerMongo } = require('../../daos/MONGO/cartsManager.mongo')

const router = Router()
const cardService = new CartsManagerMongo()

//Crea un Carrito Nuevo
router.get ('/', async (req, res) => {
    try {
        const cardNew = await cardService.createCart()
        res.send({status:'success', data: cardNew})

    } catch (error) {
        console.log(error)
    }

})

//Muestra carrito por ID
router.get ('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const productCarts = await cardService.getCart({_id: cid})
        res.send({status:'success', data: productCarts})
        
    } catch (error) {
        console.log(error)
    }

})

//Agregar Producto al Carrito
router.post ('/:cid/product/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const cid = req.params.cid

        const response = await cardService.updateCart(cid, pid, 1)
        res.send({status: 'success', data: response})
        
    } catch (error) {
        console.log(error)
    }

})

//actualizar el carrito con un arreglo de productos
router.put ('/:cid', async (req, res) => {
    try {
        const body = (req.body)
        const cid = req.params.cid

        console.log(body)
        
        body.forEach(async producto => {
            const response = await cardService.updateCart({_id: cid}, producto.productID, prodcuto.quantity)
        });
        
        res.send({status: 'success', data: response})
        
    } catch (error) {
        console.log(error)
    }

})


//actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put ('/:cid/product/:pid', async (req, res) => {
    try {
        const { body } = req.body
        const {cid, pid} = req.params
        const response = await cardService.updateCart(cid, pid, body)

        res.send({status: 'success', data: response})
        
    } catch (error) {
        console.log(error)
    }

})

//eliminar carrito por ID
router.delete ('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const response = await cardService.deleteCart({_id: cid})
        res.send({ status: 'success', data: response })
    } catch (error) {
        console.log(error)
    }

})

router.delete ('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid , pid } = req.params      
        const response = await cardService.deleteProductFromCart( cid, pid)
        res.send({ status: 'success', data: response })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router