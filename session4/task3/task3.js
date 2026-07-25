function sendVerificationEmail(email) {
    return new Promise((resolve) => {

        document.getElementById("result").innerHTML = "Sending verification email...";

        setTimeout(() => {
            resolve("Email sent successfully");
        }, 2000);

    });
}

async function registerUser(name, email) {
    try {

        if (!name || !email) {
            throw "Name and Email are required";
        }

        const message = await sendVerificationEmail(email);

        document.getElementById("result").innerHTML =
            message + "<br>User registered successfully";

    } catch (error) {
        document.getElementById("result").innerHTML = error;
    }
}

let name = prompt("Enter your name:");
let email = prompt("Enter your email:");

registerUser(name, email);