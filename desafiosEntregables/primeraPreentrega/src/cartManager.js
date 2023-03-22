import fs from "fs";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();

export default class CartManager {
    constructor () {
        this.path = "./carts.json";
    };

    getCartById = async (cartId) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const result = JSON.parse(data);
        const cartIdFound = result.find((cart) => cart.id == cartId);
        if (!cartIdFound){
            console.log("Error: Cart not found")
        } else {
            return (cartIdFound)}
    }

    addCart = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(data);
            if (carts.length === 0) {
                carts.push({id : 1, products : []});
            } else {
                carts.push({
                    id: carts.id =carts[carts.length -1].id +1,
                    products: []
                });
            };
            return await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts, null, "\t"))
        }
    }

    // addProductToCart = async (cartId, productId) => {
    //     const cart = this.getCartById(cartId);
    //     await productManager.getProductById(productId)
    //     const newCart = cart.products.push({id: productIdFound.id, quantity: 1})
    //     return await fs.promises.writeFile(
    //         this.path,
    //         JSON.stringify(newCart, null, "\t"))
    // }

    addProductToCart = async (cartId, productId) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const result = JSON.parse(data);
        const cartIdFound = result.find((cart) => cart.id == cartId);
        const product = await productManager.getProductById(productId);
        if (!cartIdFound || !product){
            return console.log("Error: Cart or product ID not found")
        }
        let index = cartIdFound.products.findIndex(prod => prod.id == productId)
        if (index === -1){
            cartIdFound.products.push({id: product.id, quantity: 1});
        }else cartIdFound.products[index].quantity++;
        return await fs.promises.writeFile(
            this.path,
            JSON.stringify(result, null, "\t"))
    }
}