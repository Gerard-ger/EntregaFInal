const { cartsModel } = require('../../models/carts.model')


class CartsManagerMongo {
    constructor(){
        this.model = cartsModel
    }

    getCarts = async () => await this.model.find({})
    getCart = async opts => await this.model.findOne(opts)
    getCartPopu = async opts => await this.model.findOne(opts).populate('products.productId')
    createCart = async newCart => await this.model.create(newCart)
    deleteCart = async (pid) => await this.model.deleteOne(pid)

    updateCart = async (cid, pid, quantity) => {
        const cart = await this.getCart({_id: cid})

        if (!cart){ return res.status(404).json({message: 'Carrito no encontrado'})}   
        
        const productos = cart.products
        const productIndex = productos.findIndex(item => item.productId.toString() === pid)

        if (productIndex > -1){
            //si estoy aca es porque tengo el producto y le agrego una mas al carrito
            productos[productIndex].quantity += quantity
        }else{
            //si el producto no esta ne le carrito lo agrego como 1
            productos.push({ productId: pid, quantity: quantity || 1 })
        }

        //guardo
        await cart.save()
        
        return cart
    }

    deleteProductFromCart = async (cid, pid) => {
        const cart = await this.getCart({_id: cid})
        const index = cart.products.findIndex(item => item.productId.toString() === pid)
                
        if (index > -1){
            cart.products.splice(index, 1)
        }

        await cart.save()
        return cart
    }

    deleteAllProductsFromCart = async (cid) => {
        const cart = await this.getCart({_id: cid})

        cart.products = []

        await cart.save()
        return cart
    }
    
}

module.exports = { CartsManagerMongo }