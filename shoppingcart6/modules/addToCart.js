import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

export function addToCart(id) {
  const product = products.find(product => product.id === id);

  if (product) {
    cart.push(product);
    console.log(product.name + " added to cart.");
  } else {
    console.log("Product not found.");
  }
}