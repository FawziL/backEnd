    const express = require('express')
    const app = express()
    const puerto = 8080
    const rutas = require('./routes/index')
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/index.html', express.static(`${__dirname}/public`))
    
    
    app.use('/', rutas)
    
    app.listen(puerto, ()=>{
        console.log("Servidor escuchando...")
    })
    
    
    


/*
app.get('/productos', async(req, res)=>{
    let respuesta = await ContenedorProducto.getAll()
    res.send(respuesta)
})
app.get('/productoRandom', async(req, res)=>{
    let productos = await ContenedorProducto.getAll()
    let productoRandom = Math.floor((Math.random() * (0-productos.length))+productos.length+1);
    console.log(productoRandom)
    let respuesta = await ContenedorProducto.getById(productoRandom)
    res.send(respuesta)
})*/