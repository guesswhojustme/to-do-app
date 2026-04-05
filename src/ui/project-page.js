import { createToDoControl } from "./to-do-page.js";
import { createNoteControl } from "./note-page.js";
import { toDoData } from '../data/data.js';

export function createProjectPage (id){
    const page = document.createElement('div');
    page.id = id;
    page.classList.add('project-page');

    console.log(`Project Page ID: ${page.id}`);

    const toDoContainer = document.createElement('div');
    toDoContainer.id = 'to-do-container';

    console.log(toDoContainer.id);
    
    Object.assign(toDoContainer.style, {
        width: '680px',
        height: '940px',
        display: 'flex',
        flexDirection: 'column' 
    })

    const noteContainer = document.createElement('div')
    Object.assign(noteContainer.style, {
        width: '330px',
        height: '940px',
        display: 'flex',
        flexDirection: 'column' 
    })

    const todoController = createToDoControl(id);
    const noteController = createNoteControl();

    toDoContainer.append(todoController);
    noteContainer.append(noteController);

    
     toDoData.forEach(data => {
        if(data.id === id){
            const span = document.createElement('span');
            span.textContent = data.title;

            toDoContainer.append(span);
        } 
    })

    page.append(toDoContainer, noteContainer)

    return page;
}