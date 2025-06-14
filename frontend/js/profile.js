// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Mock data for demonstration
    const mockProjects = [
        {
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce solution built with React and Node.js',
            image: '../assets/images/project1.jpg',
            tags: ['React', 'Node.js']
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates',
            image: '../assets/images/project2.jpg',
            tags: ['Vue.js', 'Firebase']
        },
        {
            title: 'AI Chatbot',
            description: 'An intelligent chatbot using natural language processing',
            image: '../assets/images/project3.jpg',
            tags: ['Python', 'TensorFlow']
        }
    ];

    const mockContributions = [
        {
            title: 'Open Source Library',
            description: 'Contributed to a popular open-source library',
            type: 'Pull Request',
            date: '2024-03-15'
        },
        {
            title: 'Bug Fix',
            description: 'Fixed a critical bug in a community project',
            type: 'Issue',
            date: '2024-03-10'
        }
    ];

    const mockActivity = [
        {
            type: 'project',
            action: 'created',
            title: 'E-commerce Platform',
            date: '2024-03-20'
        },
        {
            type: 'contribution',
            action: 'made',
            title: 'Open Source Library',
            date: '2024-03-15'
        }
    ];

    const mockConnections = [
        {
            name: 'Jane Smith',
            role: 'Frontend Developer',
            avatar: '../assets/images/avatar2.jpg'
        },
        {
            name: 'Mike Johnson',
            role: 'Backend Developer',
            avatar: '../assets/images/avatar3.jpg'
        }
    ];

    // Function to create project cards
    function createProjectCard(project) {
        return `
            <div class="card">
                <img src="${project.image}" alt="${project.title}">
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="card-footer">
                        ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Function to create contribution cards
    function createContributionCard(contribution) {
        return `
            <div class="card">
                <div class="card-content">
                    <h3>${contribution.title}</h3>
                    <p>${contribution.description}</p>
                    <div class="card-footer">
                        <span class="badge">${contribution.type}</span>
                        <span class="date">${new Date(contribution.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to create activity items
    function createActivityItem(activity) {
        return `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${activity.type === 'project' ? 'code' : 'code-branch'}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.action} ${activity.title}</p>
                    <span class="date">${new Date(activity.date).toLocaleDateString()}</span>
                </div>
            </div>
        `;
    }

    // Function to create connection cards
    function createConnectionCard(connection) {
        return `
            <div class="card">
                <img src="${connection.avatar}" alt="${connection.name}" class="avatar">
                <div class="card-content">
                    <h3>${connection.name}</h3>
                    <p>${connection.role}</p>
                    <button class="btn btn-outline btn-sm">Connect</button>
                </div>
            </div>
        `;
    }

    // Populate content sections
    const projectsGrid = document.querySelector('#projects .grid');
    const contributionsGrid = document.querySelector('#contributions .grid');
    const activityFeed = document.querySelector('#activity .activity-feed');
    const connectionsGrid = document.querySelector('#connections .grid');

    if (projectsGrid) {
        projectsGrid.innerHTML = mockProjects.map(createProjectCard).join('');
    }

    if (contributionsGrid) {
        contributionsGrid.innerHTML = mockContributions.map(createContributionCard).join('');
    }

    if (activityFeed) {
        activityFeed.innerHTML = mockActivity.map(createActivityItem).join('');
    }

    if (connectionsGrid) {
        connectionsGrid.innerHTML = mockConnections.map(createConnectionCard).join('');
    }
}); 