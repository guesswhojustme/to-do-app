// toDoComponent.js

export function createToDoControl() {
    // 1. Create the Container
    const toDoControl = document.createElement('div');
    toDoControl.id = 'to-do-control';
    Object.assign(toDoControl.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    });

    // 2. Create Header
    const h1 = document.createElement('h1');
    h1.textContent = "To do's";
    Object.assign(h1.style, {
        fontSize: '26px',
        color: 'var(--primaryTextColor)'
    });

    // 3. Create Button Container
    const btnContainer = document.createElement('div');
    btnContainer.id = 'to-do-page-btn-container';
    Object.assign(btnContainer.style, {
        display: 'flex',
        gap: '7px',
        position: 'relative',
        top: '20px'
    });

    // 4. Helper to create Priority Buttons
    const createPriorityBtn = (id, bgColor, hoverColor, activeColor) => {
        const btn = document.createElement('button');
        btn.id = id;
        Object.assign(btn.style, {
            width: '40px',
            height: '15px',
            borderRadius: '16px',
            border: 'none',
            backgroundColor: bgColor,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        });

        // Handle Hover/Active states via JS Listeners
        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = hoverColor);
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = bgColor);
        btn.addEventListener('mousedown', () => btn.style.backgroundColor = activeColor);
        btn.addEventListener('mouseup', () => btn.style.backgroundColor = hoverColor);

        return btn;
    };

    // Add Priority Buttons
    const neutral = createPriorityBtn('neutral', 'var(--neutral)', 'var(--neutralHover)', 'var(--neutralActive)');
    const high = createPriorityBtn('high', 'var(--red)', 'var(--redHover)', 'var(--redActive)');
    const medium = createPriorityBtn('medium', 'var(--yellow)', '#e2940c', '#ce8609');
    const low = createPriorityBtn('low', 'var(--green)', '#10b07a', '#0e9d6d');

    btnContainer.append(neutral, high, medium, low);

    // 5. Create "Add" Button Container & Button
    const addContainer = document.createElement('div');
    const addBtn = document.createElement('button');
    addBtn.id = 'add-to-do';
    addBtn.textContent = '+';
    
    Object.assign(addBtn.style, {
        width: '46px',
        height: '32px',
        position: 'relative',
        bottom: '16px',
        fontSize: '30px',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        backgroundColor: 'var(--buttonIdleColor)',
        marginLeft: '5px',
        cursor: 'pointer'
    });

    addBtn.addEventListener('mouseenter', () => addBtn.style.backgroundColor = 'var(--buttonHoverColor)');
    addBtn.addEventListener('mouseleave', () => addBtn.style.backgroundColor = 'var(--buttonIdleColor)');
    addBtn.addEventListener('mousedown', () => addBtn.style.backgroundColor = 'var(--buttonActiveColor)');

    addContainer.append(addBtn);
    btnContainer.append(addContainer); // Nested per your HTML structure

    // 6. Assemble everything
    toDoControl.append(h1, btnContainer);

    const toDopage = document.getElementById('to-do-page-container');
    toDopage.append(toDoControl);
}