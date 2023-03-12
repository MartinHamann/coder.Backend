import ProductManager from "./productManager.js";

const env = async () => {
    const productManager = new ProductManager();

    const product = {
        title : "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    };

    const changes = {
        title : "producto real",
        stock: 400,
    }
    
    // let query = await productManager.getProducts();
    // console.log(query);

    let adder = await productManager.addProduct(product);
    console.log(adder);

    // let idQuery = await productManager.getProductById(3);
    // console.log(idQuery);

    // let updater = await productManager.updateProduct(1, changes);
    // console.log(updater)

    // let deleter = await productManager.deleteProduct(2);
    // console.log(deleter)

};

env();