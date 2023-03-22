import fs from "fs";

export default class ProductManager {
    constructor () {
        this.path = "./products.json";
    };

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            return (result);
        } else {
            return [];
        }
    }

    addProduct = async (product) => {
        const products = await this.getProducts();
        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length -1].id + 1;
        }
        if (!product.thumbnail){
            product.thumbnail = [];
        }else product.thumbnail= [product.thumbnail];
        products.push(product);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        );
        return product;
    }

    getProductById = async (productId) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const result = JSON.parse(data);
        const productIdfound = result.find((product) => product.id == productId);
        if (!productIdfound){
            console.log("Error: Product not found")
        } else {
            return (productIdfound)}
    }

    idFilter = async (limit) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        let filteredIds = products.filter((product) => product.id <= limit);
        return (filteredIds);
    }
    
    updateProduct = async (id, changes) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        let updatedProduct = products.map(product => {
            if (product.id == id) {
                if (changes.thumbnail){
                    changes.thumbnail = product.thumbnail.concat(changes.thumbnail)
                }
                return {...product, ...changes};
            } else return product;
        })
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(updatedProduct, null, "\t")
        );
    }

    deleteProduct = async (id) => {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        const index = products.findIndex((product) => product.id == id);
        if (index !== -1){
            products.splice(index, 1)
        } else (console.log("Error: Product not found"))

        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        );
    }
}
