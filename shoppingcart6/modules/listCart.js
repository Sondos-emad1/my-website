import { cart } from "../data/cart.js";

export function listCart() {
  console.log("Cart:");

  cart.forEach(product => {
    console.log(`${product.name} - ${product.price}`);
  });
}