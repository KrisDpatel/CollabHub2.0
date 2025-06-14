document.addEventListener('DOMContentLoaded', function () {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.category-tab');
    const categories = document.querySelectorAll('.events-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and categories
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            tab.classList.add('active');
            const categoryId = tab.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const eventCards = document.querySelectorAll('.event-card');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        eventCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tags.some(tag => tag.includes(searchTerm));
            
            card.style.display = matches ? 'block' : 'none';
        });
    });

    // Filter functionality
    const categoryFilter = document.querySelector('.filter-options select:first-child');
    const locationFilter = document.querySelector('.filter-options select:last-child');

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedLocation = locationFilter.value;

        eventCards.forEach(card => {
            const cardCategory = card.querySelector('.tag').textContent.toLowerCase();
            const cardLocation = card.querySelector('.meta-item:last-child span').textContent.toLowerCase();
            
            const categoryMatch = !selectedCategory || cardCategory.includes(selectedCategory);
            const locationMatch = !selectedLocation || cardLocation.includes(selectedLocation.toLowerCase());
            
            card.style.display = categoryMatch && locationMatch ? 'block' : 'none';
        });
    }

    categoryFilter.addEventListener('change', applyFilters);
    locationFilter.addEventListener('change', applyFilters);

    // Check if the user is logged in (e.g., check if user data exists in local storage)
    const user = JSON.parse(localStorage.getItem('user'));

    // Get the "Create Event" button
    const createEventButton = document.querySelector('.btn-create-event'); // Corrected selector

    // If user is logged in, show the "Create Event" button
    if (user) {
        createEventButton.style.display = 'inline-block'; // Show button
        createEventButton.addEventListener('click', () => {
            // Redirect to create event page
            window.location.href = '../pages/createEvent.html';
        });
    } else {
        createEventButton.style.display = 'none'; // Hide button if not logged in
    }
});
