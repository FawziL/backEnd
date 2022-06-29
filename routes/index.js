const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()

const productApi = new productos()

routes.get('/productos', (req, res) => {
    const products = productApi.getProducts()
    res.render("vistaProductos", {
        productos: products,
        hayProductos: products.length
    });
});

routes.post('/productos', (req, res) => {
    const producto = req.body
    productApi.postProducts(producto)
    res.redirect('/')
})

module.exports = routes