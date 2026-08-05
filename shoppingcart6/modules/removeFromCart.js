import { cart } from "../data/cart.js";

export function removeFromCart(id) {
  const index = cart.findIndex(product => product.id === id);

  if (index !== -1) {
    console.log(cart[index].name + " removed from cart.");
    cart.splice(index, 1);
  } else {
    console.log("Product not found.");
  }
}