
let userPin = "1234";
let currentBalance = 1000;
let attempts = 0;
let accountLocked = false;

function login() {

    let enteredPin = document.getElementById("pin").value;
    let result = document.getElementById("result");

    if (accountLocked) {
        result.innerHTML = "Account Locked";
        return;
    }

    if (enteredPin === userPin) {

        document.getElementById("atm").style.display = "block";
        result.innerHTML = "Login Successful";

        console.log("Login Successful");

    } else {

        attempts++;

        if (attempts >= 3) {
            accountLocked = true;
            result.innerHTML = "Account Locked";
        } else {
            result.innerHTML = "Wrong PIN";
        }

    }

}

function submitOperation() {

    let operation = document.getElementById("operation").value;
    let amount = document.getElementById("amount").value;
    let result = document.getElementById("result");

    if (operation === "withdraw") {

        amount = Number(amount);

        if (amount <= 0) {

            result.innerHTML = "Invalid Amount";

        } else if (amount > currentBalance) {

            result.innerHTML = "Insufficient Balance";

        } else {

            currentBalance -= amount;
            result.innerHTML = "Withdrawal Successful<br>Current Balance: $" + currentBalance;

        }

    }

    else if (operation === "deposit") {

        amount = Number(amount);

        if (amount <= 0) {

            result.innerHTML = "Deposit Amount Must Be Greater Than Zero";

        } else {

            currentBalance += amount;
            result.innerHTML = "Deposit Successful<br>Current Balance: $" + currentBalance;

        }

    }

    else if (operation === "balance") {

        result.innerHTML = "Current Balance: $" + currentBalance;

    }

    else if (operation === "changePin") {

        if (amount.length === 4 && !isNaN(amount)) {

            userPin = amount;
            result.innerHTML = "PIN Changed Successfully";

        } else {

            result.innerHTML = "PIN Must Be Exactly 4 Digits";

        }

    }

    console.log(result.innerText);

}