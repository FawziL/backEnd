    const express = require('express')
    const app = express()
    const puerto = 8080
    const rutas = require('./routes/index')
    const handlebars = require('express-handlebars')
    const path = require('path')


    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use('/', rutas)


    
    app.engine('hbs', 
    handlebars({
      extname: '.hbs',
      defaultLayout: 'main.hbs',
    }))
    

    app.set('view engine', 'hbs')
    app.set('views', './views')
    
    

    app.listen(puerto, ()=>{
        console.log("Servidor escuchando...")
    })

