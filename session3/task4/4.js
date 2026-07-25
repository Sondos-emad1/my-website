function login(username, callback) {
    console.log("Logging in " + username + "...");

    setTimeout(function () {
        console.log("Login Successful");
        callback();
    }, 2000);
}

function nextStep() {
    console.log("Welcome to Dashboard");
}

login("Sondos", nextStep);