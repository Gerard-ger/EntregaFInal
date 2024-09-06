const { connect } = require('mongoose')

exports.connectDB = async() => {
    console.log('Base de datos conectada')
    await connect('mongodb+srv://gerar707:gerar707@cluster0.90nxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
}