const socket = io();

let products = document.getElementById("realTimeProducts");

socket.on("productAdded", (product) =>{
    let newProduct = document.createElement("div");
    newProduct.innerHTML = `<h3>${product.title}</h3> <p>${product.description}</p> <p>$${product.price}</p> <p>stock${product.stock}</p>`
    products.appendChild(newProduct);
})

socket.on("productDeleted", (index) => {
    products.removeChild(products.children[index]);
})