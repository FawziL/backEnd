const { Router } = require('express')
const router = Router()

const productos = require('../api/productos')
const ApiProductos = new productos('productos.json')
const carrito = require('../api/carritos')
const ApiCarrito = new carrito('carritos.json')
const admin = true

/*----------------------PRODUCTOS-------------------------- */
router.get('/api/productos', async function (req, res) {
  res.json(await ApiProductos.getProducts())
})

router.get('/api/productos/:id', async function (req, res) {
  res.json(await ApiProductos.getById(req.params.id))
})

router.post('/api/productos', async function(req, res) {
  if (admin){
    res.json(await ApiProductos.postProducts(req.body))}
  else{
    res.json({ error : -1, descripcion: "Ruta no autorizada" })}
})

router.put('/api/productos/:id', async function (req, res) {
  if (admin){
    res.json(await ApiProductos.putProducts(req.body, req.params.id))}
  else{
    res.json({ error : -1, descripcion: "Ruta no autorizada" })} 
})

router.delete('/api/productos/:id', async function (req, res) {
  if (admin){
    res.json(await ApiProductos.deleteProducts(req.params.id))}
  else{
    res.json({ error : -1, descripcion: "Ruta no autorizada" })
  }
})

/*----------------------CARRITO-------------------------- */

router.post('/api/carrito', async function (req, res) {
  res.json(await ApiCarrito.save(req.body))
})

router.delete('/api/carrito/:id', async function (req, res) {
  res.json(await ApiCarrito.deleteById(req.params.id))     
})

router.get('/api/carrito/:id/productos', async function (req, res){
  res.json(await ApiCarrito.getProductsByCartId(req.params.id))
})

router.post('/api/carrito/:id/productos', async function(req, res){
  const product = await ApiProductos.getById(req.body.productId)
  res.json(await ApiCarrito.addProductToCart(req.params.id, product))
})

router.delete('/api/carrito/:id/productos/:id_prod', async function(req, res) {
  res.json(await ApiCarrito.removeProductFromCart(req.params.id, req.params.id_prod))     
})



module.exports = router