const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');
console.log("Event ID for registration:", eventId);

const user = JSON.parse(localStorage.getItem('user'));
console.log("User ID:", user.id);

document.getElementById('name').value = user.name;
document.getElementById('email').value = user.email;

// 🧠 Handle form submission
document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Optional: Gather form data if you want to send that too
  const name = document.getElementById('name').value;

  fetch('http://localhost:5000/api/Eventregister-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventId,
      studentId: user.id,
      name: name, // You can send other fields too if needed
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) alert('Registered!');
      else alert(data.message);
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Something went wrong.');
    });
});
