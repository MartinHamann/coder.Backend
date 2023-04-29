import { Router } from "express";
import ProductManager from "../dao/productManager.js";
import CartManager from "../dao/cartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


router.get('/', async (req, res) => {
    const {limit = 10, sort, page = 1, category, status} = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage} = await productManager.getProducts(limit, sort, page, category, status)
        res.render("home", {
            products,
            style: "styles.css",
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            title: "Inicio"
        })
    console.log(products);
})

// router.get("/products", async (req, res) => {
//   const {limit = 10, sort, page = 1, category, status} = req.query;
//   const {
//       docs: products,
//       hasPrevPage,
//       hasNextPage,
//       nextPage,
//       prevPage} = await productManager.getProducts(limit, sort, page, category, status)
//       res.render("home", {
//           products,
//           style: "styles.css",
//           hasNextPage,
//           hasPrevPage,
//           prevPage,
//           nextPage,
//           title: "Inicio"
//       })
// })

router.get("/product/:pid", async (req, res) => {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    res.render("product", { title: "Product Details", product });
    console.log(product)
  });

  router.get("/cart", async (req, res) => {
    const cart = await cartManager.getCartById("6447582a6e7db03803831c16");
    console.log(cart)
    res.render("cart", {cart, title: "Cart items"});
  });

export default router;
