import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    await cartManager.addCart();
    return res
            .status(201)
            .send({status:"Sucess", message: "Product added successfully"})
})

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart){
        return res
            .status(404)
            .send({status:"Error", error: "Cart id not found"});
    }
    return res
        .status(200)
        .send({status: "Success", payload: cart});
})

router.post('/:cid/product/:pid', async (req, res) => {
    await cartManager.addProductToCart(req.params.cid, req.params.pid)
    const cart = await cartManager.getCartById(req.params.cid);
    const productid = await productManager.getProductById(req.params.pid);
    if (!cart || !productid){
        return res
            .status(404)
            .send({status:"Error", error: "Cart or product id not found"});
    }
    return res
        .status(200)
        .send({status: "Success", message: "Product added to cart successfully"});
})

export default router;