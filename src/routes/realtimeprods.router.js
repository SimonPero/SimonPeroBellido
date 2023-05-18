import express from "express"
import ProductManager from "./../productsManager.js"
const container = new ProductManager("./public/src/productos.json")
export  const realTimeProdsRouters = express.Router()

realTimeProdsRouters.get("/",async (req,res)=>{
    try {
        const products = await container.getProducts()
        return res.render("realTimeProducts", {products:products})
    } catch (error) {
        res.status(500).json({ succes: "false", msg: "Error", payload: {} });
    }
})
