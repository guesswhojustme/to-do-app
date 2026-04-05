import { createToDoControl } from "./to-do-page.js";
import { createNoteControl } from "./note-page.js";


export function projectPage (id){
    const page = document.createElement('div');
    page.id = id;
    page.classList.add('project-page');

    
    const toDoContainer = document.createElement('div');
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

    const todoController = createToDoControl();
    const noteController = createNoteControl();

    toDoContainer.append(todoController);
    noteContainer.append(noteController);

    page.append(toDoContainer, noteContainer)

    const pageContainer = document.getElementById('project-page-container');
    
    pageContainer.append(page)
}