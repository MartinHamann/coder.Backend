import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();

const productManager = new ProductManager();

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product){
        return res
            .status(404)
            .send({status:"Error", error: "Id not found"});
    } else return res
            .status(200)
            .send({status:"Sucess", payload: product})
})

router.get('/', async (req, res) => {
    console.log(req.query)
    const {limit, sort, page, category, status} = req.query;
    const products = await productManager.getProducts(limit, sort, page, category, status);
    console.log(products)
    return res
    .status(200)
    .send ({status: "Success", payload: products});

})

router.post('/', async (req, res) => {
    let newProduct = req.body;
    if (!newProduct){
        return res
            .status(400)
            .send({status:"Error", error: "Incomplete fields"});
    };
    await productManager.addProduct(newProduct);
    return res
            .status(201)
            .send
            ({status:"Sucess", message: "Product added successfully"})
})

router.put('/:pid', async (req, res) => {
    const changes = req.body;
    const productId = req.params.pid;
    const productUpdated = await productManager.updateProduct(productId, changes);

    if (!productUpdated){
        return res
            .status(400)
            .send({status: "Error", error: "Product not found"});
    };
    return res
        .status(202)
        .send
        ({status: "Accepted", message: "Product updated successfully"});

})

router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const deletedProduct = productManager.deleteProduct(productId)
    if (!deletedProduct){
        return res
            .status(404)
            .send({status:"Error", error: "Product does not exists"});
        }
    return res
        .status(200)
        .send({status: "Success", payload: deletedProduct, message: "Product deleted successfully"})
})

export default router;