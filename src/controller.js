import { createProjectModal, createWarningModal } from "./ui/modals.js";
import { projectData, saveProjData  } from "./data/data.js";
import deleteIcon from "./utils/svgs/delete_icon.svg"
const warningModalObj = createWarningModal();
document.body.append(warningModalObj.dialog);
const projectPage = document.getElementById('project-page')
const wrappers = document.querySelectorAll('.project-wrapper');

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
            const filtered = projectData.filter(items => items.id !== currentTargetDiv.id )
            projectData.push(filtered);
            localStorage.setItem('items', JSON.stringify(filtered));
            if (currentTargetDiv) {
                currentTargetDiv.remove();
                warningModalObj.close();
                 // Clean up after deletion
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
                while (projectPage.firstChild){
                    projectPage.removeChild(projectPage.firstChild)
                }
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