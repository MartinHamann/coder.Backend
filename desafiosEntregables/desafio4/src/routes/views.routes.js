import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get('/', async (req, res) => {
    res.render('home', {products})
})

router.get('/realtimeproducts', async (req, res) => {
    res.render("realTimeProducts", {products})
})

export default router;