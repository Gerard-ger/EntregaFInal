const { connect } = require('mongoose')

exports.connectDB = async() => {
    console.log('Base de datos conectada')
    await connect('mongodb://127.0.0.1:27017/c70125')
    
}