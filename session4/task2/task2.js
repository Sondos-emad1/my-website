function calculateShipping(weight) {
    return new Promise((resolve, reject) => {

        if (weight > 0) {
            resolve("Shipping cost: " + (weight * 5));
        } else {
            reject("Invalid weight");
        }

    });
}

let weight = prompt("Enter package weight:");

calculateShipping(weight)
    .then(cost => {
        document.getElementById("result").textContent = cost;
    })
    .catch(error => {
        document.getElementById("result").textContent = error;
    });