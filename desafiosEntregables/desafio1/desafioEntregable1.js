class ProductManager {
    constructor () {
        this.products = [];
    };

    getProducts = () => {
        console.log(this.products);
        return;
    }    

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const newProduct = {id: this.products.length ?? this.products.lenght + 1, title, description, price, thumbnail, code, stock};
        const codeExists = this.products.find((product) => product.code === newProduct.code)
        if (!newProduct.title){
            console.log("El campo title es obligatorio")
            return;
        }
        if (!newProduct.description){
            console.log("El campo description es obligatorio")
            return;
        }
        if (!newProduct.price){
            console.log("El campo price es obligatorio")
            return;
        }
        if (!newProduct.thumbnail){
            console.log("El campo thumbnail es obligatorio")
            return;
        }
        if (!newProduct.code){
            console.log("El campo code es obligatorio")
            return;
        }
        if (!newProduct.stock){
            console.log("El campo stock es obligatorio")
            return;
        }
        if (codeExists){
            console.log("El codigo ingresado ya existe")
            return;
        }else (this.products.push(newProduct));
    }

    getProductById = (productId) => {
        const productIdfound= this.products.find((product) => product.id === productId);
        if (typeof productIdfound === "undefined"){
            console.log("Not found")
        } else (console.log(productIdfound))
        return;
    }
}
const productManager = new ProductManager();

productManager.getProducts()
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", "25");
productManager.getProducts()
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", "25");