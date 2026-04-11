import deleteIconSrc from '../assets/svgs/delete_icon.svg';
import saveIconSrc from '../assets/svgs/save_icon.svg';
import { noteData } from '../data/data.js';
import { createProjectPage } from './project-page.js';

export function createNoteCard(id) {
    // 1. Create Elements
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titlediv');

    const noteTitle = document.createElement('input');
    noteTitle.type = 'text';
    noteTitle.classList.add('note-title');
    noteTitle.placeholder = 'Title';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('descriptiondiv');

    const noteDescription = document.createElement('textarea');
    noteDescription.id = 'note-description';
    noteDescription.placeholder = 'Description';

    const deleteIconDiv = document.createElement('div');
    deleteIconDiv.classList.add('deleteIconDiv');

    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIconSrc;
    deleteImg.alt = 'delete icon';

    const saveImg = document.createElement('img');
    saveImg.src = saveIconSrc;
    saveImg.alt = 'save icon';
    
    // 2. Add Hover Logic & Pointer
    deleteImg.style.cursor = 'pointer';
    deleteImg.style.transition = 'transform 0.2s, opacity 0.2s';

    deleteImg.addEventListener('mouseenter', () => {
        deleteImg.style.opacity = '0.7';
    });

    deleteImg.addEventListener('mouseleave', () => {
        deleteImg.style.transform = 'scale(1)';
        deleteImg.style.opacity = '1';
    });

    deleteImg.addEventListener('click', () => {
        //delete todo
        const noteIndex = noteData.findIndex(item => item.secondaryId === secondaryId);
        if (noteIndex !== -1) {
            // 2. Remove 1 item at that index
            noteData.splice(noteIndex, 1); 
                                            
             // 3. Save the now-shorter array
            localStorage.setItem('notes', JSON.stringify(noteData));
        }
        noteContainer.remove();
    })

    saveImg.style.cursor = 'pointer';
    saveImg.style.transition = 'transform 0.2s, opacity 0.2s';

    saveImg.addEventListener('mouseenter', () => {
        saveImg.style.opacity = '0.7';
    });

    saveImg.addEventListener('mouseleave', () => {
        saveImg.style.transform = 'scale(1)';
        saveImg.style.opacity = '1';
    });

    const secondaryId = crypto.randomUUID();

    saveImg.addEventListener('click', () => {
        const title = noteTitle.value;
        const description = noteDescription.value;

        const obj = {
            id,
            title,
            description,
            secondaryId,
        }
        noteData.push(obj);
        localStorage.setItem('notes', JSON.stringify(noteData))

        alert('note saved!');
        
        const pageContainer = document.getElementById('project-page-container');
        while (pageContainer.firstChild){
                            pageContainer.removeChild(pageContainer.firstChild)
                        };
                        const currentPage = createProjectPage(id)
                        pageContainer.append(currentPage)
    })

    // 3. Assemble the Card
    titleDiv.appendChild(noteTitle);
    descriptionDiv.appendChild(noteDescription);
    deleteIconDiv.append(saveImg, deleteImg);

    noteContainer.append(titleDiv, descriptionDiv, deleteIconDiv);

    return noteContainer;
}

export function renderNoteCard(data) {
    // 1. Create Elements
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titlediv');

    const noteTitle = document.createElement('input');
    noteTitle.type = 'text';
    noteTitle.classList.add('note-title');
    noteTitle.placeholder = 'Title';
    noteTitle.value = data.title;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('descriptiondiv');

    const noteDescription = document.createElement('textarea');
    noteDescription.id = 'note-description';
    noteDescription.placeholder = 'Description';
    noteDescription.value = data.description;

    const deleteIconDiv = document.createElement('div');
    deleteIconDiv.classList.add('deleteIconDiv');

    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIconSrc;
    deleteImg.alt = 'delete icon';

    const saveImg = document.createElement('img');
    saveImg.src = saveIconSrc;
    saveImg.alt = 'save icon';
    
    // 2. Add Hover Logic & Pointer
    deleteImg.style.cursor = 'pointer';
    deleteImg.style.transition = 'transform 0.2s, opacity 0.2s';
    deleteImg.style.opacity = '0.7';

    deleteImg.addEventListener('mouseenter', () => {
        deleteImg.style.opacity = '1';
    });

    deleteImg.addEventListener('mouseleave', () => {
        deleteImg.style.transform = 'scale(1)';
        deleteImg.style.opacity = '0.7';
    });

    const uniqueID = data.secondaryId;

    deleteImg.addEventListener('click', () => {
        //delete todo
        const noteIndex = noteData.findIndex(item => item.secondaryId === uniqueID);
        if (noteIndex !== -1) {
            // 2. Remove 1 item at that index
            noteData.splice(noteIndex, 1); 
                                            
             // 3. Save the now-shorter array
            localStorage.setItem('notes', JSON.stringify(noteData));
        }
        noteContainer.remove();
    })

    saveImg.style.cursor = 'pointer';
    saveImg.style.transition = 'transform 0.2s, opacity 0.2s';
    saveImg.style.opacity = '0.7';

    saveImg.addEventListener('mouseenter', () => {
        saveImg.style.opacity = '1';
    });

    saveImg.addEventListener('mouseleave', () => {
        saveImg.style.transform = 'scale(1)';
        saveImg.style.opacity = '0.7';
    });

    saveImg.addEventListener('click', () => {
        const title = noteTitle.value;
        const description = noteDescription.value;

        noteData.forEach(notedata => {
            if(notedata.secondaryId === data.secondaryId){
                notedata.title = title;
                notedata.description = description;
                localStorage.setItem('notes', JSON.stringify(noteData))
            }
        })

        alert('note saved!');
    })

    // 3. Assemble the Card
    titleDiv.appendChild(noteTitle);
    descriptionDiv.appendChild(noteDescription);
    deleteIconDiv.append(saveImg, deleteImg);

    noteContainer.append(titleDiv, descriptionDiv, deleteIconDiv);

    return noteContainer;
}