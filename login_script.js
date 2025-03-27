document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        alert("Login successful!"); // Placeholder action
        // Here, you can redirect to another page or process the login.
    }
});
