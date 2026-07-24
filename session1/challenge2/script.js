let customerName = "";
let productCategory = "";
let productPrice = 0;
let quantity = 0;
let couponCode = "";
let paymentMethod = "";

function checkout() {

    customerName = document.getElementById("customerName").value;
    productCategory = document.getElementById("category").value;
    productPrice = Number(document.getElementById("price").value);
    quantity = Number(document.getElementById("quantity").value);
    couponCode = document.getElementById("coupon").value;
    paymentMethod = document.getElementById("payment").value;

    let subTotal = productPrice * quantity;
    let discount = 0;

    if (productCategory === "Electronics") {
        discount = subTotal * 0.10;
    }
    else if (productCategory === "Clothes") {
        discount = subTotal * 0.15;
    }
    else if (productCategory === "Food") {
        discount = subTotal * 0.05;
    }

    let total = subTotal - discount;

    if (couponCode === "SAVE10") {
        total = total - 10;
    }

    if (paymentMethod === "Visa") {
        total = total - 20;
    }

    if (total < 0) {
        total = 0;
    }

    let vat = total * 0.14;
    let finalPrice = total + vat;

    document.getElementById("result").innerHTML =
        "<b>Invoice</b><br><br>" +
        "Customer: " + customerName + "<br>" +
        "Subtotal: $" + subTotal + "<br>" +
        "Discount: $" + discount + "<br>" +
        "VAT: $" + vat.toFixed(2) + "<br>" +
        "Final Price: $" + finalPrice.toFixed(2);

    console.log("Customer:", customerName);
    console.log("Subtotal:", subTotal);
    console.log("Discount:", discount);
    console.log("VAT:", vat);
    console.log("Final Price:", finalPrice);

}