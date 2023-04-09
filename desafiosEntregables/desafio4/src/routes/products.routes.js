import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

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
    let limit = parseInt(req.query.limit);
    let filter = await productManager.idFilter(limit);
    if (!limit){
        const products = await productManager.getProducts()
        return res
            .status(200)
            .send({status:"Sucess", payload: products})
    }else return res
            .status(200)
            .send({status:"Sucess", payload: filter})
})

router.post('/', async (req, res) => {
    let newProduct = req.body;
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category){
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
    let changes = req.body;
    if (changes.id){
        return res
            .status(400)
            .send({status: "Error", error: "Cannot update product id"})
    };
    await productManager.updateProduct(req.params.pid, changes)
    return res
        .status(202)
        .send
        ({status: "Accepted", message: "Product updated successfully"})

})

router.delete('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product){
        return res
            .status(404)
            .send({status:"Error", error: "Id not found"});
        }
    await productManager.deleteProduct(req.params.pid)
    res
    .status(200)
    .send({status: "Success", message: "Product deleted successfully"})
})

export default router;