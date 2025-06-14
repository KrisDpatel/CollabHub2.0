document.addEventListener('DOMContentLoaded', function () {
    const createEventForm = document.querySelector('.create-event-form');

    createEventForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get values from form inputs
        const eventName = document.getElementById('event-name').value;
        const eventStartDateTime = document.getElementById('event-start-datetime').value;
        const eventEndDateTime = document.getElementById('event-end-datetime').value;
        const eventDescription = document.getElementById('event-description').value;
        const eventImage = document.getElementById('event-image').files[0];  // The uploaded image
        const eventType = document.getElementById('event-type').value;
        const registrationRequired = document.getElementById('registration-required').value === 'true';
        const teamSize = document.getElementById('team-size').value;

        // Simple validation
        if (!eventName || !eventStartDateTime || !eventEndDateTime || !eventDescription || !eventType || teamSize === "") {
            alert('Please fill in all fields.');
            return;
        }

        // Create FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('startDateTime', eventStartDateTime);
        formData.append('endDateTime', eventEndDateTime);
        formData.append('description', eventDescription);
        formData.append('image', eventImage);  // Image field name must match 'upload.single("image")' in backend
        formData.append('type', eventType);
        formData.append('registrationRequired', registrationRequired);
        formData.append('teamSize', teamSize);

        // Send a POST request to the backend (assuming a /createEvent API endpoint)
        fetch('http://localhost:5000/api/event/create', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Event created successfully!');
                    window.location.href = '../pages/events.html'; // Redirect to events page
                } else {
                    alert('Error creating event: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while creating the event.');
            });
    });
});
