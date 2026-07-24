let totalRevenue = 0;
let successfulOrders = 0;
let processedOrders = 0;

let skippedInRow = 0;
let stockFailures = 0;
let systemStopped = false;

function addOrder() {

    if (systemStopped) return;

    let id = Number(document.getElementById("id").value);
    let amount = Number(document.getElementById("amount").value);

    let status = amount > 0 ? "valid" : "invalid";
    let stockAvailable = Math.random() < 0.7;

    if (status === "cancelled" || status === "invalid") {
        skippedInRow++;
    } else if (!stockAvailable) {
        skippedInRow++;
        stockFailures++;
    } else {
        totalRevenue += amount;
        successfulOrders++;
        processedOrders++;
        skippedInRow = 0;
    }

    if (skippedInRow >= 3 || stockFailures >= 3) {
        systemStopped = true;
        document.getElementById("result").textContent =
            "System stopped due to critical failure";
    }

    document.getElementById("id").value = "";
    document.getElementById("amount").value = "";
}

function finish() {

    if (systemStopped) return;

    document.getElementById("result").textContent =
`Total Revenue: ${totalRevenue}
Successful Orders: ${successfulOrders}
Processed Orders: ${processedOrders}`;
}