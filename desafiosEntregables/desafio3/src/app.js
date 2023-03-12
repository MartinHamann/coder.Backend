import express, { urlencoded } from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}));

app.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product){
        return res.send({error: "Product not found"})
    } else return res.send(product);
})

app.get('/products', async (req, res) => {
    // const products = await productManager.getProducts();
    let limit = parseInt(req.query.limit);
    let filter = await productManager.idFilter(limit);
    if (!limit){
        return (res.send(await productManager.getProducts()))
    }else return (res.send(filter))
})

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});