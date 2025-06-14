document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Redirect unauthorized users
  if (!user || user.role !== 'student') {
    alert('Unauthorized access. Please log in as a student.');
    window.location.href = '/pages/login.html';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/register-event/student/${user.id}`);
    const data = await res.json();

    const eventList = document.getElementById('event-list');

    if (!data.success) {
      eventList.innerHTML = '<p>Failed to load events.</p>';
      return;
    }

    if (!data.events || data.events.length === 0) {
      eventList.innerHTML = '<p>You have not registered for any events.</p>';
      return;
    }

    data.events.forEach((event) => {
      if (!event || !event.title) return; // safeguard

      const div = document.createElement('div');
      div.classList.add('event-card');
      div.innerHTML = `
        <div class="event-inner-vertical">
          <img class="event-photo" src="http://localhost:5000/uploads/${event.photo}" alt="Event Image" />
          <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-desc">${event.description}</p>
            <p><strong>Date:</strong> ${event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}</p>
          </div>
      `;
      eventList.appendChild(div);
    });

  } catch (err) {
    console.error('Fetch error:', err);
    alert('Failed to fetch registered events.');
  }
});
