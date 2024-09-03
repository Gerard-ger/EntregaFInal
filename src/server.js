const express = require('express')
const handlebars = require('express-handlebars')
const { ProductManagerMongo } = require('./daos/MONGO/productManager.mongo.js')
const { Server } = require('socket.io')
const appRouter = require('./router/index.js')
const { connectDB } = require('./config/index.js')

const app = express()
const PORT = 8080

// Configuración del socket.io
const httpServer = app.listen(PORT, () => { console.log('escuchando en el puerto: ', PORT) })
const io = new Server(httpServer)


const productSocket = (io) => {
    io.on('connection', async (socket) => {
        const productService = new ProductManagerMongo()
        console.log('nueva conexion')

        const products = await productService.getProducts()
        socket.emit('productList', products)

        socket.on('addProduct', async data => {
            await productService.createProduct(data)
            const products = await productService.getProducts()
            io.emit('productList', products)
        })

        socket.on('deleteProduct', async data => {
            await productService.deleteProduct(data)
            console.log("socket", data)
            const products = await productService.getProducts()
            io.emit('productList', products)
        })

    })
}

productSocket(io)


//----------------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(appRouter)
connectDB()


//configuracion de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')





