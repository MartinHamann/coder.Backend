import { productsModel } from "../models/products.js";

export default class ProductManager {
    constructor () {};

    getAllProducts = async () => {
        try {
            const products = await productsModel.paginate({}, {lean: true});
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async (limit = 10, sort, page = 1, category, status) => {
        try {
            let query = {};
            category ? (query.category = category) : null;
            status ? (query.status = status.toLowerCase()) : null;
            let sortedAs;
            if (sort === "asc"){
                sortedAs = "price"
            }else if (sort === "desc"){
                sortedAs = "-price"
            }else {
                sortedAs = undefined;
            }
            const products = await productsModel
            .paginate(query, {sort: sortedAs, page, limit, lean: true})

            products.hasPrevPage
            ? (products.prevLink = `/products?page=${products.prevPage}`)
            : (products.prevLink = null);
          products.hasNextPage
            ? (products.nextLink = `/products?page=${products.nextPage}`)
            : (products.nextLink = null);
            console.log(products)
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    
    getProductById = async (id) =>{
        try {
            const product = await productsModel.findById(id).lean(true);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (newProduct) => {
        try {
            const productAdded = await productsModel.create(newProduct);
            return productAdded;
        } catch (error) {
            console.log(error);
        }
    }


    updateProduct = async (id, changes) =>{
        try {
            const updatedProduct = productsModel.findOneAndUpdate(id, changes);
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = productsModel.deleteOne(id);
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}