import express from "express";
import ProductManager from "./productsManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { homeRouter } from "./routes/home.router.js";
import handlerbars from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { realTimeProdsRouters } from "./routes/realtimeprods.router.js";

const container = new ProductManager("./src/productos.json");
const app = express();
const port = 8081;

// Create HTTP server
const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

// Create Socket.IO server
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("A new socket connection has been established: " + socket.id);

  socket.on("new-product", async (title, description, price, code, stock, category) => {
    try {
      await container.addProduct(title, description, price, code, stock, category);
      // Update product list after adding a new product
      const productsList = await container.getProducts();

      socketServer.emit("msg_back_to_front", productsList);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("delete-product", async (productId) => {
    try {
      console.log("Deleting product with ID:", productId);
      console.log(await container.deleteProduct(productId));
      // Update product list after deleting a product
      const productsList = await container.getProducts();
      socketServer.emit("msg_back_to_front", productsList);
    } catch (error) {
      console.log(error);
    }
  });
});

app.use("/test-socket", realTimeProdsRouters);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", handlerbars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/homerouter", homeRouter);