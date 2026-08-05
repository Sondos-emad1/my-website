import { addToCart } from "./modules/addToCart.js";
import { removeFromCart } from "./modules/removeFromCart.js";
import { listCart } from "./modules/listCart.js";
import { calculateTotal } from "./modules/calculateTotal.js";

addToCart(1);
addToCart(3);
addToCart(4);

listCart();

calculateTotal();

removeFromCart(3);

listCart();

calculateTotal();