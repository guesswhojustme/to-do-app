// noteComponent.js

export function createNoteControl() {
    // 1. Create the Control Header Div (The Main Return Element)
    const noteControl = document.createElement('div');
    noteControl.id = 'note-control';
    
    // Applying styles for #note-control
    Object.assign(noteControl.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    });

    // 2. Create Heading
    const h1 = document.createElement('h1');
    h1.textContent = 'Notes';
    
    // Applying styles for #note-control > h1
    Object.assign(h1.style, {
        fontSize: '26px',
        color: 'var(--primaryTextColor)'
    });

    // 3. Create Add Note Button
    const addNoteBtn = document.createElement('button');
    addNoteBtn.id = 'add-note';
    addNoteBtn.textContent = '+';
    
    // Applying styles for #add-note
    Object.assign(addNoteBtn.style, {
        width: '46px',
        height: '32px',
        fontSize: '30px',
        borderRadius: '8px',
        position: 'relative',
        top: '3px',
        border: 'none',
        color: 'white',
        backgroundColor: 'var(--buttonIdleColor)',
        marginLeft: '5px',
        cursor: 'pointer'
    });

    // 4. Add Interactions (Hover/Active)
    addNoteBtn.addEventListener('mouseenter', () => {
        addNoteBtn.style.backgroundColor = 'var(--buttonHoverColor)';
    });
    addNoteBtn.addEventListener('mouseleave', () => {
        addNoteBtn.style.backgroundColor = 'var(--buttonIdleColor)';
    });
    addNoteBtn.addEventListener('mousedown', () => {
        addNoteBtn.style.backgroundColor = 'var(--buttonActiveColor)';
    });
    addNoteBtn.addEventListener('mouseup', () => {
        addNoteBtn.style.backgroundColor = 'var(--buttonHoverColor)';
    });

    // 5. Assemble and Return
    noteControl.append(h1, addNoteBtn);

    return noteControl;
}