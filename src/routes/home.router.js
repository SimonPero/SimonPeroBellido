import express from "express"
import ProductManager from "../productsManager.js"

export const homeRouter = express.Router()

homeRouter.use(express.json())
homeRouter.use(express.urlencoded({ extended: true }))

const container = new ProductManager("./public/src/productos.json")

homeRouter.get("/", async(req,res)=>{
    try {
    const products = await container.getProducts()
    return res.render("home",{products:products})
    } catch (error) {
        
    }
})