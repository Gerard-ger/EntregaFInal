const express = require('express')
const handlebars = require('express-handlebars')
const { ProductManagerMongo } = require('./daos/MONGO/productManager.mongo.js')
const { CartsManagerMongo } = require('./daos/MONGO/cartsManager.mongo')
const { Server } = require('socket.io')
const appRouter = require('./router/index.js')
const { connectDB } = require('./config/index.js')
const { initializePassport } = require('./config/passport.config.js')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session      = require('express-session')


const app = express()
const PORT = 8080

// Configuración del socket.io
const httpServer = app.listen(PORT, () => { console.log('escuchando en el puerto: ', PORT) })
const io = new Server(httpServer)


const productSocket = (io) => {
    io.on('connection', async (socket) => {
        const productService = new ProductManagerMongo()
        const cartService = new CartsManagerMongo()

        console.log('nueva conexion')

        const products = await productService.getProducts()
        socket.emit('productList', products)

        const productCarts = await cartService.getCartPopu({_id: "66d729f3d403fb9c06ff344a"})
        socket.emit('CartProductList', productCarts)

        //socket para productos
        socket.on('addProduct', async data => {
            await productService.createProduct(data)
            const products = await productService.getProducts()
            io.emit('productList', products)
        })

        socket.on('deleteProduct', async data => {
            await productService.deleteProduct({_id: data})
            const products = await productService.getProducts()
            io.emit('productList', products)
        })
        

        //socket para carritos
        socket.on('deleteProductToCart', async data => {
            
            const response = await cartService.deleteProductFromCart( data.cartId, data.productId)
            
            const productCarts = await cartService.getCartPopu({_id: data.cartId})
            io.emit('CartProductList', productCarts)
        })

        socket.on('addToCart', async data => {
            const response = await cartService.updateCart(data.cartId, data.productId, data.quantity)
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

//coookies
// la palabra secreta del cookie parse debe estar en el .env
app.use(cookieParser('palabrasecreta'))
app.use(session({
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))

//passport jwt
initializePassport()
app.use(passport.initialize())


//configuracion de plantillas
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});

app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')





