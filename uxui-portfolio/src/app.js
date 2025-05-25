// filepath: uxui-portfolio/src/app.js

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

function loadProjects() {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects');
            data.projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
                projectElement.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}