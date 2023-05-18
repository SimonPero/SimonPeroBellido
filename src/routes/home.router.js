import express from "express"
import ProductManager from "../productsManager.js"

export const homeRouter = express.Router();
const container = new ProductManager("./public/src/productos.json");

homeRouter.get("/", async (req, res) => {
  try {
    const products = await container.getProducts();
    return res.render("index", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default homeRouter;