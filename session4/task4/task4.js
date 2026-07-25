async function getUserProfile(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();

        document.getElementById("result").innerHTML =
            "Name: " + user.name + "<br>" +
            "Email: " + user.email;

    } catch (error) {
        document.getElementById("result").innerHTML = error.message;
    }
}

let id = prompt("Enter User ID:");

getUserProfile(id);