import edit_icon from '../assets/svgs/edit_icon.svg';
import delete_icon from '../assets/svgs/delete_icon.svg'
import finished_icon from '../assets/svgs/green-checkbox_icon.svg';
import unfinished_icon from '../assets/svgs/unfinished_icon.svg';
import { toDoData } from '../data/data.js';
import { createWarningModal, createEditTodoModal } from './modals.js';
import { format, addDays, isPast, parseISO, compareAsc } from 'date-fns';

const warningModalObj = createWarningModal();
document.body.append(warningModalObj.dialog);

export function todoCard(data){
	//create ui and put data in the UI based on the argument that it has
	//data is dependent on the to do card form
	// 1. Create Icons
    const editImg = document.createElement('img');
    editImg.src = edit_icon;
    const deleteImg = document.createElement('img');
    deleteImg.src = delete_icon;

	const uniqueID = data.secondaryId;

    // 2. Main Container
    const card = document.createElement('div');
    card.className = 'to-do-container';
    card.id = data.id;

    const editModalObj = createEditTodoModal(data);
    document.body.append(editModalObj.dialog);

    editImg.addEventListener('click', () => {
        editModalObj.openModal();
    })

    // 3. Date & Checkbox Wrapper
    const dateCheckWrapper = document.createElement('div');
    dateCheckWrapper.id = 'date-check-wrapper';

    deleteImg.addEventListener('click', () => {
        warningModalObj.open();
        
            warningModalObj.deleteBtn.addEventListener('click', () => {
                //delete todo
                const todoIndex = toDoData.findIndex(item => item.secondaryId === uniqueID);
                if (todoIndex !== -1) {
                // 2. Remove 1 item at that index
                toDoData.splice(todoIndex, 1); 
                                    
                // 3. Save the now-shorter array
                localStorage.setItem('todos', JSON.stringify(toDoData));
                }
            card.remove();
            warningModalObj.close();
            }, { once: true });
            
        console.log(` ${data.title}'s ID: ${uniqueID}`);
    })

    const checkboxDiv = document.createElement('div');
    const checkboxImg = document.createElement('img');
    checkboxImg.src = unfinished_icon;
    checkboxImg.className = 'checkbox';
	checkboxImg.id = uniqueID;
    checkboxImg.alt = 'icon';
    checkboxDiv.append(checkboxImg);

	const finishedImg = document.createElement('img');
	const finishedIcon = finished_icon;
	finishedImg.src = finishedIcon;
	finishedImg.className = 'finishedbox';
	finishedImg.id = uniqueID


	checkboxImg.addEventListener('click', () => {
		checkboxDiv.removeChild(checkboxDiv.firstChild);
		console.log(data.status);
		console.log(`checkbox icon id: ${finishedImg.id}`);
		
		//change status and save
		toDoData.forEach(data => {
			if(finishedImg.id === data.secondaryId){
				data.status = 'done';
				console.log(data.status);
				localStorage.setItem('todos', JSON.stringify(toDoData))
			}
		})

		checkboxDiv.append(finishedImg);
		Object.assign(card.style, {
			opacity: '0.5',
		})
	})


	console.log(data.status);
	finishedImg.addEventListener('click', () => {
		checkboxDiv.removeChild(checkboxDiv.firstChild);
		console.log(`finished icon id: ${finishedImg.id}`);
		
		//change status and save
		toDoData.forEach(data => {
			if(finishedImg.id === data.secondaryId){
				data.status = 'not-done';
				console.log(data.status);
				localStorage.setItem('todos', JSON.stringify(toDoData))
			}
		})
		
		checkboxDiv.append(checkboxImg);
		Object.assign(card.style, {
			opacity: '1',
		})
	})

    const dateObj = parseISO(data.dueDate);
    const displayDate = format(dateObj, 'MMMM do yyyy');

    const dueDateP = document.createElement('p');
    dueDateP.id = 'duedate';
    dueDateP.textContent = `due: ${displayDate}`;

    dateCheckWrapper.append(checkboxDiv, dueDateP);

    // 4. Title & Description Wrapper
    const titleDescWrapper = document.createElement('div');
    titleDescWrapper.className = 'title-desc-wrapper';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'todo-title';
    const titleP = document.createElement('p');
    titleP.className = 'todo-title-p';
    titleP.textContent = data.title;
    titleDiv.append(titleP);

    const descDiv = document.createElement('div');
    descDiv.className = 'todo-description';
    const descP = document.createElement('p');
    descP.className = 'todo-description-p';
    descP.textContent = data.description;
    descDiv.append(descP);

    titleDescWrapper.append(titleDiv, descDiv);

    // 5. Priority & Action Wrapper
    const priorityActionWrapper = document.createElement('div');
    priorityActionWrapper.id = 'priority-editdel-wrapper';

    const editDelDiv = document.createElement('div');
    editDelDiv.className = 'edit-del';

    const priorityBtn = document.createElement('button');
    // Dynamically set ID based on data.priority (low, medium, high)
    priorityBtn.id = `todo-priority-${data.priority}`;
    priorityBtn.textContent = data.priority;

    priorityActionWrapper.append(editDelDiv, priorityBtn);

    // Assemble Card
    card.append(dateCheckWrapper, titleDescWrapper, priorityActionWrapper);

    // --- INTERACTIVITY LOGIC ---

    // Hover logic: Show/Hide Edit & Delete icons
    card.addEventListener('mouseenter', () => {
        const currentEditDel = card.querySelector('[class^="edit-del"]');
        currentEditDel.append(editImg, deleteImg);
    });

    card.addEventListener('mouseleave', () => {
        editImg.remove();
        deleteImg.remove();
    });

	if(data.status === 'done'){
			checkboxDiv.removeChild(checkboxDiv.firstChild);
			checkboxDiv.append(finishedImg);
			Object.assign(card.style, {
				opacity: '0.5',
			})
		}

    // Click logic: Toggle Expansion
    card.addEventListener('click', (e) => {
        // Prevents expanding when clicking functional buttons
        if (e.target.className === 'finishedbox' || e.target.className === 'checkbox' || e.target.closest('.edit-del')) return;
		console.log(data.status);
		console.log(uniqueID);

        const isExpanded = card.classList.toggle('expanded');

        if (isExpanded) {
            // APPLY EXPANDED STYLE IDS/CLASSES
            card.className = 'to-do-container-expnd expanded';
            dateCheckWrapper.id = 'date-check-wrapper-expnd';
            dueDateP.id = 'duedate-expnd';
            titleDescWrapper.className = 'title-desc-wrapper-expnd';
            titleDiv.className = 'todo-title-expnd';
            titleP.className = 'todo-title-p-expnd';
            descDiv.className = 'todo-description-expnd';
            descP.className = 'todo-description-p-expnd';
            priorityActionWrapper.id = 'priority-editdel-wrapper-expnd';
            editDelDiv.className = 'edit-del-expnd';
            priorityBtn.id = `todo-priority-${data.priority}-expnd`;
        } else {
            // REVERT TO IDLE STYLE IDS/CLASSES
            card.className = 'to-do-container';
            dateCheckWrapper.id = 'date-check-wrapper';
            dueDateP.id = 'duedate';
            titleDescWrapper.className = 'title-desc-wrapper';
            titleDiv.className = 'todo-title';
            titleP.className = 'todo-title-p';
            descDiv.className = 'todo-description';
            descP.className = 'todo-description-p';
            priorityActionWrapper.id = 'priority-editdel-wrapper';
            editDelDiv.className = 'edit-del';
            priorityBtn.id = `todo-priority-${data.priority}`;
        }
    });


	return card;
}
