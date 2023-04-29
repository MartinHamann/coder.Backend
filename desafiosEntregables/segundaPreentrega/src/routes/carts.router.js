import { Router } from "express";
import CartManager from "../dao/cartManager.js";
import { cartsModel } from "../models/carts.js";

const router = Router();

const cartmanager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const consulta = await cartmanager.getCarts();
        return res.send({ status: "Success", payload: consulta });
    } catch (error) {
        console.log(error)
    }
});
router.post("/", async (req, res) => {
    try {
        let cart = req.body;
        const createCart = await cartmanager.createCart(cart);
        if (!createCart) {
            return res
                .status(400)
                .send({ status: "error", error: "Cart already exists" });
        }
        return res.send({ status: "success", payload: createCart });
    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const findcart = await cartmanager.getCartById(cid);
        if (!findcart) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: findcart });
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body

        let result = await cartmanager.addProductToCart(cId, pId, quantity);
        console.log(result)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: result });

    } catch (error) {
        console.log(error)
    }
})
router.put("/:cid", async (req,res) => {
    try {
        const id = req.params.cid
        const valor = req.body;
        const result = await cartmanager.updateCart(id,valor)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be updated" });
        }
        return res.send({ status: "success", payload: result});
    } catch (error) {
        console.log(error)
    }
})


router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const {quantity} = req.body
        console.log(cId, pId)

        let resul = await cartmanager.updateProductFromCart(cId, pId, quantity);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        console.log(error)
    }
})
router.delete("/:cid", async (req,res) => {
    try {
        const cId= req.params.cid;
        let resultado= await cartmanager.deleteCart(cId);
        if (!resultado) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be eliminated" });
        }
        return res.send({ status: "success", payload: resultado });
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
       const {cid, pid} = req.params;
        let result = await cartmanager.deleteproductfromCart(cid, pid);
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        console.log(error)
    }
})
export default router;