const express = require('express')
const app = express()
const {Server: IOServer} = require('socket.io')
const puerto = 8080
const rutas = require('./routes/index')
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', rutas)


const serverExpress = app.listen(puerto, (error)=>{
    if(error){
        console.log(`Hubo un error: ${error}`)
    }else{
        console.log(`Servidor escuchando: 8080`)
      }
})

const io = new IOServer(serverExpress)
const products = []
io.on('connection', socket =>{
    console.log(`Se conectó un usuario ${socket.id}`) 
    io.emit('client:price:thumbnail', products)
    socket.on('client:price:thumbnail', objectInfo => {
        products.push(objectInfo)
        io.emit('client:price:thumbnail', products)
    })
})