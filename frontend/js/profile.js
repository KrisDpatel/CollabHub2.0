document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from local

document.getElementById('profile-pic').src = `http://localhost:5000/uploads/${user.profilePic}` || "../pages/photo.png"; // Default profile picture if none is set

document.getElementById('name').textContent = `${user.name}`;

document.getElementById('role').textContent = `${user.role}`;
document.getElementById('link').textContent = `${user.email}`;

});
