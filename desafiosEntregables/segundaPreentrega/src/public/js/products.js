const cartId = "6447582a6e7db03803831c16";

async function addToCart(productId) {
  let response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "POST",
    body: JSON.stringify({ quantity: 1 }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  console.log(result);
}