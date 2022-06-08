
const fs = require('fs')

class Contenedor {
    constructor(nombre){
    this.nombre = nombre
    }
    getAll = async() => {
        return JSON.parse(await this.leerArchivo(this.nombre))
        
    }
    leerArchivo = async ruta => {
        try {
            const resultado = await fs.promises.readFile(ruta, 'utf-8')
            if (resultado.length <= 0) {
                return '[]'
            } else {
                return resultado
            }
        }catch (error) {
            console.log(`El archivo no fue encontrado, creando uno nuevo: ${error}`)
            return this.escribir('[]')
    }
}
    escribir = async texto => {
        try {
            await fs.promises.writeFile(this.nombre, texto)
            console.log("Archivo escrito con éxito")
            return texto
        } catch (error) {
            console.log(`Hubo un error: ${error}`)
        }
}
    save = async(parametro) => { 
        let productosParseados = await this.getAll()
        let id = productosParseados.length > 0 ? productosParseados[productosParseados.length - 1].id : 0
        parametro.id = id + 1
        productosParseados.push(parametro)
        let productoStrinfigy = JSON.stringify(productosParseados)
        await fs.promises.writeFile(this.nombre, productoStrinfigy)
        return parametro.id
    }
    getById = async(id) => {
        const array = await this.getAll()
        const getObject = array.find(product => product.id === id)
        return getObject
    }
    deleteById = async(id) => {
        const array = await this.getAll()
        const deleteId = array.filter(product => product.id !== id)
        await fs.promises.writeFile(this.nombre, JSON.stringify(deleteId))
        console.log(deleteId)
    }
   
    deleteAll = async() => {
        await fs.promises.writeFile(this.nombre, '')
    }

}
let ContenedorProducto = new Contenedor('./index.txt')

let caracProducto = {
    title: "1dddd", 
    price: "precio", 
    thumbnail: "url"}

let caracProducto2 = {
    title: "222dd", 
    price: "precio", 
    thumbnail: "url"}


const procesar = async() => {
    let resultado = await ContenedorProducto.save(caracProducto)
    resultado = await ContenedorProducto.save(caracProducto2)
    console.log(await ContenedorProducto.getById(2))
    console.log(await ContenedorProducto.deleteById(5))
}
//procesar()



const express = require('express')
const app = express()
const puerto = 8080

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
})
app.listen(puerto, ()=>{
    console.log("Servidor escuchando...")
})

