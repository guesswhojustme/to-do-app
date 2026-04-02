import { createProjectModal } from "./ui/modals.js";

export function sideNavControl(){
    const addProjectIcon = document.getElementById('addProject_icon')
    const nav = document.querySelector('nav');
    const modalObj = createProjectModal();
    document.body.appendChild(modalObj.dialog);

    addProjectIcon.addEventListener('click', () => {
        console.log("add project icon has been clicked");
        modalObj.openModal();
    });

    
    
    nav.addEventListener('click', (event) => {
        const tabs = event.target;

        switch(tabs.id){
            case 'all-tab':
                console.log("all tab has been clicked");
                break;
            case 'today-tab':
                console.log("today tab has been clicked");
                break;
            case 'upcoming-tab':
                console.log("upcoming tab has been clicked");
                break;
            case 'important-tab':
                console.log("important tab has been clicked");
                break;
            case 'finished-tab':
                console.log("finished tab has been clicked");
                break;
        }
    })
}
