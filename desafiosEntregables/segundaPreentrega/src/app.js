import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

const app = express()


// Configuración handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/", express.static(`${__dirname}/public`))


// Routing
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)


dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@ecommerce-dev.pryzbwu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);

app.listen("8080", (req, res) => {
    console.log("Server listening on port 8080")
});