document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Redirect unauthorized users
  if (!user || user.role !== 'student') {
    alert('Unauthorized access. Please log in as a student.');
    window.location.href = '/pages/login.html';
    return;
  }

  try {
    const res1 = await fetch(`http://localhost:5000/api/Eventregister-event/student/${user.id}`);
    const data = await res1.json();

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
      // div.classList.add('event-card');
      div.className= 'event-card';
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

    // Handle collaborations

     const res2 = await fetch(`http://localhost:5000/api/Collabregister-event/student/${user.id}`);
     const data2 = await res2.json();

     const collabList = document.getElementById('collab-list');

    if (!data2.success) {
      collabList.innerHTML = '<p>Failed to load collab.</p>';
      return;
    }

    if (!data2.collabs || data2.collabs.length === 0) {
      collabList.innerHTML = '<p>You have not registered for any collabs.</p>';
      return;
    }

    data2.collabs.forEach((collab) => {
      // if (!collab || !collab.title) return; // safeguard

      const div = document.createElement('div');
      // div.classList.add('event-card');
      div.className= 'event-card';
      div.innerHTML = `
        <div class="event-inner-vertical">
          <img class="event-photo" src="http://localhost:5000/uploads/${collab.photo}" alt="Event Image" />
          <div class="event-content">
            <h3 class="event-title">${collab.title}</h3>
            <p class="event-desc">${collab.description}</p>
            <p><strong>Date:</strong> ${collab.date ? new Date(collab.date).toLocaleDateString() : 'TBD'}</p>
          </div>
      `;
      collabList.appendChild(div);
    });


  } catch (err) {
    console.error('Fetch error:', err);
    alert('Failed to fetch registered events.');
  }
});
