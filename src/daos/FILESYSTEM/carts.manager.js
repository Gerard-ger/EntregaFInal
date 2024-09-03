const { json } = require('body-parser');
const fs = require('fs');
const path = './dbjson/cartsDB.json'

class Cart {
    constructor() {
        this.id = "",
        this.products = []
    }
}

class CartManager {
    constructor() {
        this.path = path;
    }

readCart = async () => {
    try {
        //Leo el archivo y lo parseo, luego devuelvo la lista de cart que obtengo
        const result = await fs.promises.readFile(path, 'utf-8');
        const carts = JSON.parse(result);
        return carts;
    } catch (error) {
        //si no lee nada devuelte una lista vacia
        return []
    }
}

createCart = async () => {
    try {
        //creo un nuevo carito
        const carts = new Cart();
        //obtengo la lista de carts desde le archivo
        const cartsDB = await this.readCart();
        
        //le agrego un ID al cart nuevo
        if (cartsDB.length == 0) {
            carts.id = 1
        } else {
            carts.id = cartsDB[cartsDB.length-1].id+1
        }
        //agrego ese cart al array de cartsDB
        cartsDB.push(carts);

        //Escribo la nuava lista de productos al archivo
        await fs.promises.writeFile(path, JSON.stringify(cartsDB, null, '\t'));
        
        return carts;
        
    } catch (error) {
        console.log(error)
    }
}

getCartByID = async (cid) => {
    try {
        //obtengo la lista de carts desde le archivo
        const cartsDB = await this.readCart();
        //busco el cart por el id
        const cart = cartsDB.find(carro => carro.id === cid);
        if (cart) {
            return cart;
        } else {
            console.error('No se encontró el cart')
        }     
    } catch (error) {
        console.log(error)
    }
}

createProductToCart = async (cid, pid) => {
    try {
        //obtengo la lista de carts desde le archivo
        const cartsDB = await this.readCart();

        //busco el cart por el id
        const index = cartsDB.findIndex(c => c.id === cid)

        if (index === -1) {
            return console.error('No se encontró el cart')
        }
        //aparto los productos de ese cart
        const producCart = cartsDB[index].products

        //si el carrito no tiene productos lo creo
        if (producCart.length==0) {
            const product = { id: pid, quantity: 1}
            producCart.push(product)
            
        }else{
            //busco el producto por el id
            const product = producCart.find(p => p.id === pid);

            if (product) {
                //si encuentro el producto aumento la cantidad del producto en el carrito
                product.quantity++
            }else{
                //sino lo agrego al carrito
                const product = { id: pid, quantity: 1}
                producCart.push(product)
            }
        }        
        //Escribo la nueva lista de productos al archivo
        await fs.promises.writeFile(path, JSON.stringify(cartsDB, null, '\t'));
        return 'Se agrego un producto al carrito'
        
    } catch (error) {
        console.log(error)
    }
}

}

//[
//    {id: '', products: [{productID:'', quantity: 1}]}
//]
module.exports = CartManager