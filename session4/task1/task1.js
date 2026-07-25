const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};

function getProduct(id) {
    return new Promise((resolve, reject) => {
        if (products[id]) {
            resolve(products[id]);
        } else {
            reject("Product not found");
        }
    });
}

let id = prompt("Enter Product ID:");

getProduct(id)
    .then(product => {
        document.getElementById("result").textContent = "Product: " + product;
    })
    .catch(error => {
        document.getElementById("result").textContent = error;
    });