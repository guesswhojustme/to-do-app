import { createProj } from "./project-card.js";
import { addProjectWrapperAction } from "../controller.js";
import { projectData } from "../data/data.js";

export function createProjectModal() {
    // 1. Create the Dialog Container
    const dialog = document.createElement('dialog');
    dialog.id = 'new-project-modal';
    
    // Apply Dialog Styles
    Object.assign(dialog.style, {
        width: '450px',
        height: '235px',
        backgroundColor: 'var(--modalBgColor)',
        border: 'var(--cardBorderStyle)',
        borderRadius: '16px',
        boxShadow: 'var(--boxShadowStyle)',
        display: 'none', // We use flex when showModal is called, but start hidden
        flexDirection: 'column',
        paddingLeft: '40px',
        paddingTop: '20px',
        gap: '20px'
    });

    // 2. Create Header Span
    const span = document.createElement('span');
    span.textContent = 'Create new project';
    Object.assign(span.style, {
        color: 'var(--primaryTextColor)',
        fontSize: '22px',
        fontWeight: 'bold'
    });

    // 3. Create Input Section (Label + Input)
    const inputContainer = document.createElement('div');
    Object.assign(inputContainer.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    });

    const label = document.createElement('label');
    label.setAttribute('for', 'new-project-title');
    label.textContent = 'Name';
    Object.assign(label.style, {
        fontSize: '21px',
        color: 'var(--primaryTextColor)'
    });

    const input = document.createElement('input');
    input.id = 'new-project-title';
    input.style.outline = 'none';

    Object.assign(input.style, {
        width: '370px',
        height: '58px',
        backgroundColor: 'var(--cardBgColor)',
        border: 'var(--cardBorderStyle)',
        borderRadius: '8px',
        fontSize: '26px'
    });

    inputContainer.append(label, input);

    // 4. Create Button Section (Cancel + Create)
    const buttonContainer = document.createElement('div');
    Object.assign(buttonContainer.style, {
        display: 'flex',
        gap: '20px',
        width: '370px',
        justifyContent: 'flex-end'
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancel-project-btn';
    cancelBtn.textContent = 'cancel';
    
    const createBtn = document.createElement('button');
    createBtn.id = 'create-project-btn';
    createBtn.textContent = 'create';
    // createBtn.style.fontFamily = 'var(--font)';

    createBtn.addEventListener('click', () => {
        if(input.value == ''){
            alert('empty input! please insert text');
            return true;
        }
        const obj = {
            title: input.value,
            id:  crypto.randomUUID()
        }
        projectData.push(obj)
        localStorage.setItem('items', JSON.stringify(projectData))
        createProj(obj.title, obj.id);
        closeModal();
        addProjectWrapperAction();
        input.value = '';
    })

    // Shared Button Styles
    const applySharedBtnStyles = (btn) => {
        Object.assign(btn.style, {
            fontFamily: 'var(--font)',
            width: '88px',
            height: '28px',
            borderRadius: '8px',
            border: 'var(--cardBorderStyle)',
            fontSize: '16px',
            color: 'white',
            cursor: 'pointer'
        });
    };

    applySharedBtnStyles(cancelBtn);
    applySharedBtnStyles(createBtn);

    // Specific Button Styles
    cancelBtn.style.backgroundColor = 'var(--neutral)';
    createBtn.style.backgroundColor = 'var(--buttonIdleColor)';
    createBtn.style.fontWeight = 'bold';

    // 5. Add Interactions (Hover/Active states)
    // Note: Since :hover is a CSS pseudo-class, we use JS listeners
    cancelBtn.addEventListener('mouseenter', () => cancelBtn.style.backgroundColor = 'var(--neutralHover)');
    cancelBtn.addEventListener('mouseleave', () => cancelBtn.style.backgroundColor = 'var(--neutral)');
    cancelBtn.addEventListener('mousedown', () => cancelBtn.style.backgroundColor = 'var(--neutralActive)');

    createBtn.addEventListener('mouseenter', () => createBtn.style.backgroundColor = 'var(--buttonHoverColor)');
    createBtn.addEventListener('mouseleave', () => createBtn.style.backgroundColor = 'var(--buttonIdleColor)');
    createBtn.addEventListener('mousedown', () => createBtn.style.backgroundColor = 'var(--buttonActiveColor)');

    // 6. Assembly
    buttonContainer.append(cancelBtn, createBtn);
    dialog.append(span, inputContainer, buttonContainer);

    // Logic to fix the "Display: Flex" issue with Dialog
    // Modals usually need display: flex, but <dialog> defaults to display: block
    const openModal = () => {
        dialog.style.display = 'flex';
        dialog.showModal();
    };

    const closeModal = () => {
        dialog.style.display = 'none';
        dialog.close();
    };

    

    cancelBtn.addEventListener('click', closeModal);

    return { dialog, openModal, closeModal };
}

export function createWarningModal() {
    // 1. Create the Dialog Container
    const dialog = document.createElement('dialog');
    dialog.id = 'warning-modal';
    
    Object.assign(dialog.style, {
        width: '450px',
        height: '235px',
        backgroundColor: 'var(--cardBgColor)', // Added to match your theme
        border: 'var(--cardBorderStyle)',
        borderRadius: '16px',
        boxShadow: 'var(--boxShadowStyle)',
        display: 'none', // Managed by open/close logic
        flexDirection: 'column',
        padding: '30px'
    });

    // 2. Warning Header
    const span = document.createElement('span');
    span.textContent = 'Warning';
    Object.assign(span.style, {
        fontSize: '22px',
        fontWeight: 'bold',
        color: 'var(--primaryTextColor)'
    });

    // 3. Message Text
    const p = document.createElement('p');
    p.textContent = 'Are you sure you want to delete this? (this action cannot be undone).';
    Object.assign(p.style, {
        fontSize: '21px',
        color: 'var(--primaryTextColor)',
        paddingTop: '15px',
        margin: '10px 0' // Basic spacing
    });

    // 4. Button Container
    const buttonDiv = document.createElement('div');
    Object.assign(buttonDiv.style, {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        paddingTop: '30px'
    });

    // 5. Buttons
    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancel';
    cancelBtn.textContent = 'cancel';

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'delete';
    deleteBtn.textContent = 'delete';
    

    // deleteBtn.addEventListener('click', () =>  {
    //     confirm = true;
    //     closeModal();
    // })

    // Shared Button Styles
    const applyBtnStyles = (btn) => {
        Object.assign(btn.style, {
            fontFamily: 'var(--font)',
            width: '88px',
            height: '28px',
            borderRadius: '8px',
            border: 'var(--cardBorderStyle)',
            fontSize: '16px',
            color: 'white',
            cursor: 'pointer'
        });
    };

    applyBtnStyles(cancelBtn);
    applyBtnStyles(deleteBtn);

    // Cancel Button Specific Styles & Hover
    cancelBtn.style.backgroundColor = 'var(--neutral)';
    cancelBtn.addEventListener('mouseenter', () => cancelBtn.style.backgroundColor = '#5c626d');
    cancelBtn.addEventListener('mouseleave', () => cancelBtn.style.backgroundColor = 'var(--neutral)');
    cancelBtn.addEventListener('mousedown', () => cancelBtn.style.backgroundColor = '#4c515a');

    // Delete Button Specific Styles & Hover
    deleteBtn.style.backgroundColor = 'var(--red)';
    deleteBtn.style.fontWeight = 'bold';
    deleteBtn.addEventListener('mouseenter', () => deleteBtn.style.backgroundColor = 'var(--redHover)');
    deleteBtn.addEventListener('mouseleave', () => deleteBtn.style.backgroundColor = 'var(--red)');
    deleteBtn.addEventListener('mousedown', () => deleteBtn.style.backgroundColor = 'var(--redActive)');

    // 6. Logic & Assembly
    const closeModal = () => {
        dialog.style.display = 'none';
        dialog.close();
    };

    // const openModal = () => {
    //     dialog.style.display = 'flex';
    //         dialog.showModal();
    // }

    cancelBtn.addEventListener('click', closeModal);

    buttonDiv.append(cancelBtn, deleteBtn);
    dialog.append(span, p, buttonDiv);

    return {
        dialog,
        deleteBtn, // Exported so you can add the actual delete logic elsewhere
        open: () => {
            dialog.style.display = 'flex';
            dialog.showModal();
        },
        close: closeModal,
    };
}

export function createTodoModal() {
    // 1. Main Dialog Container
    const dialog = document.createElement('dialog');
    dialog.id = 'new-todo-list-modal';
    
    // Applying CSS for #new-todo-list-modal
    Object.assign(dialog.style, {
        display: 'none', // Note: display:flex on <dialog> can sometimes override the browser's default center positioning
        flexDirection: 'column',
        width: '607px',
        height: '500px',
        backgroundColor: 'var(--modalBgColor)',
        border: 'var(--cardBorderStyle)',
        borderRadius: '16px',
        boxShadow: 'var(--boxShadowStyle)',
        paddingLeft: '45px',
        paddingTop: '20px',
        gap: '20px',
        boxSizing: 'border-box' 
    });

    // 2. Title Span
    const span = document.createElement('span');
    span.textContent = 'Create new to do list';
    Object.assign(span.style, {
        fontSize: '22px',
        fontWeight: 'bold'
    });

    // 3. Input Title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'todo-title';
    titleInput.placeholder = 'Title';
    Object.assign(titleInput.style, {
        width: '505px',
        height: '67px',
        border: 'var(--cardBorderStyle)',
        outline: 'none',
        fontFamily: 'var(--font)',
        fontSize: '29px',
        color: 'var(--primaryTextColor)',
        borderRadius: '8px',
        boxSizing: 'border-box'
    });

    // 4. Description Textarea
    const descTextarea = document.createElement('textarea');
    descTextarea.id = 'todo-description';
    descTextarea.placeholder = 'Description';
    Object.assign(descTextarea.style, {
        width: '505px',
        height: '200px',
        border: 'var(--cardBorderStyle)',
        outline: 'none',
        resize: 'none',
        fontFamily: 'var(--font)',
        fontSize: '19px',
        color: 'var(--primaryTextColor)',
        borderRadius: '8px',
        boxSizing: 'border-box'
    });

    // 5. Date & Priority Wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'date-priority-wrapper';
    Object.assign(wrapper.style, {
        width: '505px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px'
    });

    // Helper to create the vertical label/input groups
    const createInputGroup = (labelText, inputElement) => {
        const div = document.createElement('div');
        Object.assign(div.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        });
        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.color = 'var(--secondaryTextColor)';
        div.append(label, inputElement);
        return div;
    };

    // Date Input
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'todo-dt';
    Object.assign(dateInput.style, {
        width: '119px',
        height: '28px',
        borderRadius: '7px',
        border: 'var(--cardBorderStyle)',
        fontFamily: 'var(--font)'
    });

    // Priority Select
    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority-lvl';
    ['low', 'medium', 'high'].forEach(level => {
        const opt = document.createElement('option');
        opt.value = level;
        opt.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        prioritySelect.appendChild(opt);
    });
    Object.assign(prioritySelect.style, {
        width: '90px',
        height: '28px',
        borderRadius: '7px',
        border: 'var(--cardBorderStyle)',
        fontFamily: 'var(--font)'
    });

    wrapper.append(createInputGroup('Due date', dateInput), createInputGroup('Priority', prioritySelect));

    // 6. Button Footer Wrapper
    const btnWrapper = document.createElement('div');
    btnWrapper.id = 'todo-modal-btn-wrapper';
    Object.assign(btnWrapper.style, {
        display: 'flex',
        gap: '20px',
        width: '505px',
        justifyContent: 'flex-end'
    });

    const createBtn = (id, text, bgColor, hoverColor, activeColor) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        Object.assign(btn.style, {
            fontFamily: 'var(--font)',
            width: '88px',
            height: '28px',
            borderRadius: '8px',
            border: 'var(--cardBorderStyle)',
            fontSize: '16px',
            color: 'white',
            backgroundColor: bgColor,
            cursor: 'pointer',
            transition: 'background-color 0.1s'
        });

        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = hoverColor);
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = bgColor);
        btn.addEventListener('mousedown', () => btn.style.backgroundColor = activeColor);
        btn.addEventListener('mouseup', () => btn.style.backgroundColor = hoverColor);
        
        return btn;
    };

    const closeModal = () => {
        dialog.style.display = "none";
        dialog.close();
    }

    const openModal = () => {
        dialog.style.display = "flex";
        dialog.showModal();
    }

    const cancelBtn = createBtn('cancel-todo-btn', 'cancel', 'var(--neutral)', '#5c626d', '#4c515a');
    const createBtnEl = createBtn('create-todo-btn', 'create', 'var(--buttonIdleColor)', 'var(--buttonHoverColor)', 'var(--buttonActiveColor)');
    createBtnEl.style.fontWeight = 'bold';

    btnWrapper.append(cancelBtn, createBtnEl);

    cancelBtn.addEventListener('click', () => {
        closeModal();
    })

    // Final Assembly
    dialog.append(span, titleInput, descTextarea, wrapper, btnWrapper);

    return {
        dialog,
        closeModal, 
        openModal,
    }
}