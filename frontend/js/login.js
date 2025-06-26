// login.js

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple form validation
    if (!email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    // You can add more validation logic (e.g., checking email format) here if needed

    // Create login data object
    const loginData = {
        email: email,
        password: password
    };

    // Send a POST request to the backend (assuming a /login API endpoint)
    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    // console.log(response)
    .then(data => {
        console.log(data)
        // Assuming the backend returns a success response with a token or user info
        if (data.success) {
            alert("Login successful!");
            localStorage.setItem('user', JSON.stringify({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
                profilePic: data.user.profilePic // Store profile picture URL if available
            }));
            // localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
            // Redirect to home page or dashboard
            // window.location.href = '../pages/home.html';
            if (data.user.role === 'student') {
                window.location.href = '../student-dashbord/event_student.html';
              } 
              else if (data.user.role === 'faculty') {
                window.location.href = '../faculty-dashbord/event_faculty.html';
              }
        } else {
            // Display error message
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(error => {
        // Handle any errors (e.g., network issues)
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again.");
    });
}

// Add event listener to form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
