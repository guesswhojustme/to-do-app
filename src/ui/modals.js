

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
    cancelBtn.addEventListener('mouseenter', () => cancelBtn.style.backgroundColor = '#5c626d');
    cancelBtn.addEventListener('mouseleave', () => cancelBtn.style.backgroundColor = 'var(--neutral)');
    cancelBtn.addEventListener('mousedown', () => cancelBtn.style.backgroundColor = '#4c515a');

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

