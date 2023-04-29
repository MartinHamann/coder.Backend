import { cartsModel } from "../models/carts.js";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();

export default class CartManager {
    constructor () {};

    getCarts = async () => {
        try {
          const carts = await cartsModel.find();
          return carts;
        } catch (error) {
          console.log(error);
        }
      };

    getCartById = async (cartId) => {
        try {
            const cartIdFound = await cartsModel.findOne({_id: cartId}).lean();
            console.log(cartIdFound);
            return cartIdFound;
        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (cart) => {
        try {
            const cartCreated = await cartsModel.create(cart);
            return cartCreated;
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cartId, productId, quantity) => {
      try {
        const productExist = await cartsModel.findOne({
          products: { $elemMatch: { product: productId } },
        });
  
        if (!productExist) {
          const updatedCart = await cartsModel.updateOne(
            { _id: cartId },
            { $push: { products: [{ product: productId, quantity }] } }
          );
          return updatedCart;
        }
  
        const updatedCart = await cartsModel.updateOne(
          { _id: cartId },
          { $inc: { "products.$[elem].quantity": quantity } },
          { arrayFilters: [{ "elem.product": productId }] }
        );
        return updatedCart;
      } catch (error) {
        console.log(error);
      }
    };

      updateCart = async (cid, cart) => {
        try {
          const cartUpdated = await cartsModel.updateOne({ _id: cid }, { products: cart })
          return cartUpdated
        } catch (error) {
          console.log(error)
        }
      }

      updateProductFromCart = async (cid, pid, quantity) => {
        try {
          let updatedCartProduct;
          if (isNaN(quantity) || quantity < 0) {
            updatedCartProduct = await cartsModel.updateOne(
              { _id: cid, "products.productId": pid },
              { "products.$.quantity": 1 }
            );
          }else{
            updatedCartProduct = await cartsModel.updateOne(
              { _id: cid, "products.productId": pid },
              { "products.$.quantity": quantity })
          }
    
          return updatedCartProduct;
        } catch (error) {
          console.log(error);
        }
      };
      deleteCart = async (cid) => {
        try {
          const cart = await cartsModel.findOne({ _id: cid })
          console.log(cart.products);
          const cartDeleted = await cartsModel.updateOne({ _id: cid }, { products: [] });
          return cartDeleted
        } catch (error) {
          console.log(error)
        }
      }
      deleteProductFromCart = async (cid, pid) => {
        try {
    
          const productDeleted = await cartsModel.updateOne(
            { _id: cid },
            { $pull: { products: { productId: pid } } }
          );
    
          return productDeleted;
        } catch (error) {
    
        }
      }
    }

    // addCart = async () => {
    //     if (fs.existsSync(this.path)) {
    //         const data = await fs.promises.readFile(this.path, "utf-8");
    //         const carts = JSON.parse(data);
    //         if (carts.length === 0) {
    //             carts.push({id : 1, products : []});
    //         } else {
    //             carts.push({
    //                 id: carts.id =carts[carts.length -1].id +1,
    //                 products: []
    //             });
    //         };
    //         return await fs.promises.writeFile(
    //             this.path,
    //             JSON.stringify(carts, null, "\t"))
    //     }
    // }

//     addProductToCart = async (cartId, productId) => {
//         const data = await fs.promises.readFile(this.path, "utf-8");
//         const result = JSON.parse(data);
//         const cartIdFound = result.find((cart) => cart.id == cartId);
//         const product = await productManager.getProductById(productId);
//         if (!cartIdFound || !product){
//             return console.log("Error: Cart or product ID not found")
//         }
//         let index = cartIdFound.products.findIndex(prod => prod.id == productId)
//         if (index === -1){
//             cartIdFound.products.push({id: product.id, quantity: 1});
//         }else cartIdFound.products[index].quantity++;
//         return await fs.promises.writeFile(
//             this.path,
//             JSON.stringify(result, null, "\t"))
//     }
// }