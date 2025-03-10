// Register User
function registerUser(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

   
    let userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("Email already registered. Please login.");
    }

    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html"; 
}


function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);
    if (!validUser) {
        alert("Invalid email or password!");
    }

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Login successful! Redirecting...");
    window.location.href = "dashboard.html"; 
}


window.onload = function() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && document.getElementById("userName")) {
        document.getElementById("userName").innerText = user.firstName;
    }
};


function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html"; 
}

document.getElementById("signupForm").addEventListener("submit", registerUser);