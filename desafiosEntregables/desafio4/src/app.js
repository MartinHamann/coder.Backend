import express, { urlencoded } from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import ___dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import socket from "./socket.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(`${___dirname}/public`))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",`${___dirname}/views` );
app.set("view engine", "handlebars");


const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080")
});

socket.connect(httpServer);