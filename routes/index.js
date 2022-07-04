const express = require('express')
const { Router } = require('express')
const productos = require('../api/productos')
const routes = Router()


const productApi = new productos()


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

module.exports = routes