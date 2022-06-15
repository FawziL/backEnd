const { Router } = require('express')
const router = Router()
let users = []


router.get('/api/usuarios', (req, res) => {
    res.json(users)
})

router.post('/api/usuarios', (req, res) => {
    const { nombre, apellido, edad } = req.body
    let id = users.length > 0 ? users[users.length - 1].id : 0
    id = id + 1
    const user = { nombre, apellido, edad, id }
    users.push(user)
    res.json(user)
})


router.get('/api/usuarios/:id', (req, res) => {
    const id = req.params.id

    const foundProduct = users.find(producto => producto.id ===  Number(id))

    if (!foundProduct) res.status(404).json({ error : 'producto no encontrado' })
    res.json(foundProduct)
})





router.put('/api/usuarios/:id', (req, res) => {
    const { nombre, apellido, edad  } = req.body
    const product = users.find(producto => producto.id ===  Number(req.params.id))

    product.nombre = nombre
    product.apellido = apellido
    product.edad = edad

    users.push(product)
    console.log("hola")
    res.sendStatus(200)
})





router.delete('/api/usuarios/:id', (req, res) => {
    const id = req.params.id

    users = users.filter(producto => producto.id !==  Number(id))

    res.json({result:'Usuario borrado',
    id:req.params.id})
})

module.exports = router






