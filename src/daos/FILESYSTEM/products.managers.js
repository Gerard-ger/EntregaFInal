const { json } = require('body-parser');
const fs = require('fs');
const path = './dbjson/productsDB.json'


class ProductManager {
    constructor() {
        this.path = path;
    }

    async readProduct() {
        try {
            //Leo el archivo y lo parseo, luego devuelvo la lista de productos que obtengo
            const result = await fs.promises.readFile(path, 'utf-8');
            const productos = JSON.parse(result);
            return productos;
        } catch (error) {
            //si no lee nada devuelte una lista vacia
            return []
        }
    }

    async addProduct(producto) {
        try {
            //compruebo que el producto venga completo
            if (!producto.title || !producto.description || !producto.code || !producto.price || !producto.status|| !producto.stock || !producto.category ) {
                return console.error("Producto incompleto")
            }

            //obtengo la lista de productos desde le archivo
            const productos = await this.readProduct();
            
            //le agrego un ID al producto nuevo
            if (productos.length == 0) {
                producto.id = 1
            } else {
                producto.id = productos[productos.length-1].id+1
            }
            //agrego ese producto al array de Productos
            productos.push(producto);

            //Escribo la nuava lista de productos al archivo
            await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
            
            return 'Se agrego un nuevo producto'
            
        } catch (error) {
            console.log(error)
        }
        
    }

    async getProduct(){
        try {
            //obtengo la lista de productos desde le archivo
            const product = await this.readProduct()
            //devuelvo todos los pruductos
            return product
        } catch (error) {
            console.log(error)
        }
        
    }
   
    async getProductById(id) {
        try {
            //obtengo la lista de productos desde le archivo
            const productos = await this.readProduct();
            //Busco en el array el producto correcto segun el ID pasado
            const producto = productos.find(p => p.id === id);
            //retorno el encontrado o error
            return producto
        } catch (error) {
            console.log(`No se encontró un producto con el id ${id}`+error)
        }
    }

    async updateProduct(id, productoAActualizar) {

        //obtengo la lista de productos desde le archivo
        const productos = await this.readProduct();
        //recorro el array buscando el producto correcto segun el ID pasado
        const index = productos.findIndex(p => p.id === id);
        //si no encuento devuelvo error
        if (index === -1) {
            return `No se encontró un producto con el id ${id}`;
        }
        //actualizo los datos
        productos[index] = {...productos[index], ...productoAActualizar };
        //Vuelvo a guardar el array actualizado en el archivo
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
        //aviso que se actualizo correctamente
        return `Producto con id ${id} actualizado correctamente`;
    }

    async deleteProduct(id) {
        //obtengo la lista de productos desde le archivo
        const productos = await this.readProduct();

        //recorro el array buscando el producto correcto segun el ID pasado
        const index = productos.findIndex(p => p.id === id);
        //si no encuento devuelvo error
        if (index === -1) {
            return `No se encontró un producto con el id ${id}`;
        }
        //elimino producto
        productos.splice(index, 1);
        //guardo el archivo actualizado
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
        //aviso que se elimino correctamente
        return `Producto con id ${id} eliminado correctamente`;

    }


}

module.exports = ProductManager
