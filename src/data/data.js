import { addProjectWrapperAction } from '../controller.js';
import { createProj } from '../ui/project-card.js';

export let projectData = JSON.parse(localStorage.getItem('projectTitles')) || [];
export let toDoData = JSON.parse(localStorage.getItem('todos')) || [];
export let noteData = JSON.parse(localStorage.getItem('notes')) || [];

export function renderProjectData(){
    const projectContainer = document.getElementById('projects-container');
    projectContainer.innerHTML = '';

    projectData.forEach(items => {
        createProj(items.title, items.id);
    });

    addProjectWrapperAction();
}
