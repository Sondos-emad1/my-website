import { cart } from "../data/cart.js";

export function calculateTotal() {
  let total = 0;

  cart.forEach(product => {
    total += product.price;
  });

  console.log(`Total: ${total}`);
}