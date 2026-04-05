import { createProjectModal, createWarningModal } from "./ui/modals.js";
import { projectData } from "./data/data.js";
import deleteIcon from "./assets/svgs/delete_icon.svg"
const warningModalObj = createWarningModal();
document.body.append(warningModalObj.dialog);
import { projectPage } from "./ui/project-page.js";
const pageContainer = document.getElementById('project-page-container');

const img = document.createElement('img');
img.src = deleteIcon;
img.style.cursor = 'pointer';
    
img.addEventListener('mouseenter', () => img.style.opacity = '0.7'// Example: dim it slightly on hover
);
img.addEventListener('mouseleave', () => img.style.opacity = '1'  // Reset when mouse leaves
);

let currentTargetDiv = null;

img.addEventListener('click', () => {
    warningModalObj.open();
        
        // Use { once: true } so we don't stack up listeners every time we click
        warningModalObj.deleteBtn.addEventListener('click', () => {
            if (currentTargetDiv) {
                const index = projectData.findIndex(item => item.id === currentTargetDiv.id);
                if (index !== -1) {
                    // 2. Remove 1 item at that index
                    projectData.splice(index, 1); 
                    
                    // 3. Save the now-shorter array
                    localStorage.setItem('items', JSON.stringify(projectData));
                }
                currentTargetDiv.remove();
                warningModalObj.close();
                currentTargetDiv = null;// Clean up after deletion
            }
        }, { once: true });
});


export function addProjectWrapperAction() {
        console.log('addProjectWrapper is triggerd');
        const wrappers = document.querySelectorAll('.project-wrapper');
        wrappers.forEach(div => {
            console.log(div);
            div.addEventListener('mouseenter', () => {
                currentTargetDiv = div; // Save the div reference here
                div.append(img);
            });
            
            div.addEventListener('mouseleave', () => {
                img.remove();
                // Don't set currentTargetDiv to null here yet, 
                // because the modal needs it!
            });
            div.addEventListener('click', () => {
                while (pageContainer.firstChild){
                    pageContainer.removeChild(pageContainer.firstChild)
                };

                projectPage(div.id);

                console.log(div.id);
                wrappers.forEach(div => {
                    if(div.style.backgroundColor){
                        div.style.backgroundColor = '';
                    }
                })

                Object.assign(div.style, {
                    backgroundColor: 'var(--sideNavActiveColor)'
                })
            })
        });
}

export function sideNavControl(){
    const addProjectIcon = document.getElementById('addProject_icon')
    const nav = document.querySelector('nav');
    const projectModalObj = createProjectModal();
    document.body.append(projectModalObj.dialog);;

    addProjectIcon.addEventListener('click', () => {
        console.log("add project icon has been clicked");
        projectModalObj.openModal();
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