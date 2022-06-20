    const express = require('express')
    const app = express()
    const puerto = 8080
    const { Router } = express
    const productos = require('./api/productos')
    
    
    const productApi = new productos()
    const routes = new Router()
    
    routes.use(express.json())
    routes.use(express.urlencoded({ extended: true }))
        
    routes.get('/', (req, res) => {
        res.json(productApi.getProducts())
    })
    routes.get('/:id', (req, res) => {
        res.json(productApi.getById(req.params.id))
    })
    routes.post('/', (req, res) => {
        res.json(productApi.postProducts(req.body))
    }) 
    routes.put('/:id', (req, res) => {
        res.json(productApi.putProducts(req.body, req.params.id))
    })
    routes.delete('/:id', (req, res) => {
        res.json(productApi.deleteProducts(req.params.id))
    })
    



    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/index.html', express.static(`${__dirname}/public`))
    app.use('/api/productos', routes)
    
    app.listen(puerto, ()=>{
        console.log("Servidor escuchando...")
    })
    
    
    


