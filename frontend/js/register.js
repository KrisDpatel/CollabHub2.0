// register.js

// Function to handle form submission
function handleRegister(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("hi");

    // Get values from the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const profilePic = document.getElementById('profile-pic').files[0];
    const role = document.getElementById('role').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Simple form validation
    if (!name || !email || !password || !confirmPassword || !profilePic || !role || !termsAccepted) {
        alert("Please fill out all fields and accept the terms.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Create FormData object for handling file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profilePic", profilePic);

    // Send a POST request to the backend (assuming a /register API endpoint)
    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the backend returns a success response
        if (data.success) {
            alert("Registration successful!");
            // Redirect to login or home page after successful registration
            window.location.href = '../pages/login.html';
        } else {
            // Display backend error message
            alert(data.message || "An error occurred. Please try again.");
        }
    })
    .catch(error => {
        // Handle any errors (e.g., network issues)
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
    });
}

// Add event listener to form after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.auth-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    } else {
        console.error('The form element is not present in the DOM.');
    }
});

