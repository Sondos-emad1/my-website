let userPin = "1234";
let currentBalance = 1000;
let loginAttempts = 0;
let accountLocked = false;

function login() {

    if (accountLocked) {
        document.getElementById("message").innerHTML = "Account Locked";
        console.log("Account Locked");
        return;
    }

    let enteredPin = document.getElementById("pin").value;

    if (enteredPin === userPin) {

        document.getElementById("login").style.display = "none";
        document.getElementById("atm").style.display = "block";
        console.log("Login Successful");

    } else {

        loginAttempts++;

        if (loginAttempts >= 3) {
            accountLocked = true;
            document.getElementById("message").innerHTML = "Account Locked";
            console.log("Account Locked");
        } else {
            document.getElementById("message").innerHTML = "Wrong PIN";
            console.log("Wrong PIN");
        }

    }

}

function submitOperation() {

    let selectedOperation = document.getElementById("operation").value;
    let transactionAmount = document.getElementById("amount").value;
    let result = document.getElementById("result");

    if (selectedOperation === "withdraw") {

        transactionAmount = Number(transactionAmount);

        if (transactionAmount <= 0) {
            result.innerHTML = "Invalid Amount";
            console.log("Invalid Amount");
        } else if (transactionAmount > currentBalance) {
            result.innerHTML = "Insufficient Balance";
            console.log("Insufficient Balance");
        } else {
            currentBalance -= transactionAmount;
            result.innerHTML = "Withdraw Successful<br>Balance = $" + currentBalance;
            console.log("Withdraw Successful");
            console.log("Current Balance = $" + currentBalance);
        }

    } else if (selectedOperation === "deposit") {

        transactionAmount = Number(transactionAmount);

        if (transactionAmount <= 0) {
            result.innerHTML = "Invalid Amount";
            console.log("Invalid Amount");
        } else {
            currentBalance += transactionAmount;
            result.innerHTML = "Deposit Successful<br>Balance = $" + currentBalance;
            console.log("Deposit Successful");
            console.log("Current Balance = $" + currentBalance);
        }

    } else if (selectedOperation === "balance") {

        result.innerHTML = "Current Balance = $" + currentBalance;
        console.log("Current Balance = $" + currentBalance);

    } else if (selectedOperation === "changePin") {

        if (transactionAmount.length === 4 && !isNaN(transactionAmount)) {
            userPin = transactionAmount;
            result.innerHTML = "PIN Changed Successfully";
            console.log("PIN Changed Successfully");
        } else {
            result.innerHTML = "PIN Must Be Exactly 4 Digits";
            console.log("PIN Must Be Exactly 4 Digits");
        }

    }

}