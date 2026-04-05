import hashtag from '../assets/svgs/tag_icon.svg'

export function createProj(title, id){
    const projectContainer = document.getElementById('projects-container');

    const wrapper = document.createElement('div');
    wrapper.classList.add('project-wrapper');
    wrapper.id = id;

    Object.assign(wrapper.style, {
        width: '280px',
        height: '35px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
        transition: 'background-color 0.2s' // Optional: makes the hover smoother
    });

    // 2. Create the Left Content Container (Icon + Text)
    const contentLeft = document.createElement('div');
    Object.assign(contentLeft.style, {
        display: 'flex',
        gap: '5px',
        alignItems: 'center'
    });


    // 3. Create the Icon Container and Img
    const iconContainer = document.createElement('div');
    const iconImg = document.createElement('img');
    iconImg.src = hashtag;
    iconImg.alt = 'icon';
    
    iconContainer.append(iconImg);

    // 4. Create the Project Name Span
    const span = document.createElement('span');
    span.textContent = title;
    

    // 6. Assembly
    contentLeft.append(iconContainer, span);
    wrapper.append(contentLeft);

    projectContainer.append(wrapper);
}