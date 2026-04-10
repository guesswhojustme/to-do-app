import { createToDoControl } from "./to-do-page.js";
import { createNoteControl } from "./note-page.js";
import { toDoData, noteData } from '../data/data.js';
import { todoCard } from "./to-do-card.js";
import { createNoteCard, renderNoteCard } from "./note-card.js";

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
        flexDirection: 'column',
    })

    const noteContainer = document.createElement('div')
    noteContainer.id = 'note-container'

    Object.assign(noteContainer.style, {
        width: '330px',
        height: '940px',
        display: 'flex',
        flexDirection: 'column',
    })

    const todoController = createToDoControl(id);
    const noteController = createNoteControl(id);

    toDoContainer.append(todoController);
    noteContainer.append(noteController);

    //render to do lists
    toDoData.forEach(data => {
        if(data.id === id){
           const todo = todoCard(data);
           
           toDoContainer.append(todo);
        } 
    })

    noteData.forEach(data => {
        if(data.id === id){
            const note = renderNoteCard(data)

            noteContainer.append(note);
        }
    })

    page.append(toDoContainer, noteContainer)

    return page;
}