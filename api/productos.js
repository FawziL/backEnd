const { promises: fs } = require('fs')

class productos {
    constructor(nombre) {
      this.nombre = nombre 
    }
    postProducts = async(producto) => {
        let productList = await this.getProducts()
        let id = productList.length > 0 ? productList[productList.length - 1].id : 0
        producto.id = id + 1
        producto.timestamp = Date.now()
        productList.push(producto)
        try {
            await fs.writeFile(this.nombre, JSON.stringify(productList, null, 2))
            return {id:producto.id}
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    getProducts = async () => {
        try {
            const allProducts = await fs.readFile(this.nombre, 'utf-8')
            return JSON.parse(allProducts)   
        } catch (error) {
            return []
        }
    }
    getById = async(id) => {
        const products = await this.getProducts()
        const foundProduct = products.find(product => product.id === Number(id))
        return foundProduct || { error: 'Producto no encontrado'}
    }
    putProducts = async(product, id) => {
        const modifiedProduct = { id: Number(id), ...product }
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === Number(id))
        if (index !== -1) {
            products[index] = modifiedProduct
            try {
                await fs.writeFile(this.nombre, JSON.stringify(products, null, 2))
                return modifiedProduct
            } catch (error) {
                throw new Error(`Error al modificar: ${error}`)
            }
        } else {
            return { error: 'Producto no encontrado'}
        }
    }
    deleteProducts = async(id)  =>{
        let products = await this.getProducts()
        const index = products.findIndex(product => product.id === Number(id))
        if (index !== -1) {
            products = products.filter(product => product.id !== Number(id))
            await fs.writeFile(this.nombre, JSON.stringify(products))
        } else {
            return { error: 'Producto no encontrado'}
        } 
    }
}
module.exports =  productos