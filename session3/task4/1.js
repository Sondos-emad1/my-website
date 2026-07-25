function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function finish() {
    console.log("Greeting Finished");
}

greet("Sondos", finish);