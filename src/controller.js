import { createProjectModal, createWarningModal } from "./ui/modals.js";
import { projectData, toDoData } from "./data/data.js";
import deleteIcon from "./assets/svgs/delete_icon.svg"
const warningModalObj = createWarningModal();
document.body.append(warningModalObj.dialog);
import { createProjectPage } from "./ui/project-page.js";
import { todoCard } from "./ui/to-do-card.js";
const pageContainer = document.getElementById('project-page-container');
import { format, isTomorrow, isPast, parseISO, compareAsc } from 'date-fns';



function removePageContainerChild(){
    while (pageContainer.firstChild){
                    pageContainer.removeChild(pageContainer.firstChild)
                };
}

const img = document.createElement('img');
img.src = deleteIcon;
img.style.cursor = 'pointer';
img.id = 'delete-icon';
    
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
                    localStorage.setItem('projectTitles', JSON.stringify(projectData));
                }

                const todoIndex = toDoData.findIndex(item => item.id === currentTargetDiv.id);
                if (todoIndex !== -1) {
                    // 2. Remove 1 item at that index
                    toDoData.splice(todoIndex, 1); 
                    
                    // 3. Save the now-shorter array
                    localStorage.setItem('todos', JSON.stringify(toDoData));
                }

                currentTargetDiv.remove();
                pageContainer.removeChild(pageContainer.firstChild);
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

                removePageContainerChild();

                const currentPage = createProjectPage(div.id)

                pageContainer.append(currentPage)

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
                removePageContainerChild();
                const dateToday = format(new Date(), 'yyyy-MM-dd');

                const todayTabPage = document.createElement('div');
                Object.assign(todayTabPage.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '20px'
                })

                pageContainer.append(todayTabPage);
                toDoData.forEach(data => {
                    if(data.dueDate === dateToday){
                        const todos = todoCard(data)

                        todayTabPage.append(todos);
                    }
                })
                
                break;
            case 'upcoming-tab':
                console.log("upcoming tab has been clicked");
                removePageContainerChild();

                const upcomingTabPage = document.createElement('div');
                Object.assign(upcomingTabPage.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '20px'
                })

                pageContainer.append(upcomingTabPage);

                toDoData.forEach(data => {
                    if(isTomorrow(data.dueDate)){
                        const todos = todoCard(data)

                        upcomingTabPage.append(todos);
                    }
                })
                
                break;
            case 'important-tab':
                console.log("important tab has been clicked");
                removePageContainerChild();

                const importantTabPage = document.createElement('div');
                Object.assign(importantTabPage.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '20px'
                })

                pageContainer.append(importantTabPage);
                toDoData.forEach(data => {
                    if(data.priority === 'high'){
                        const todos = todoCard(data)

                        importantTabPage.append(todos);
                    }
                });

                break;
            case 'finished-tab':
                console.log("finished tab has been clicked");
                
                removePageContainerChild();

                const finishedTabPage = document.createElement('div');
                Object.assign(finishedTabPage.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '20px'
                })

                pageContainer.append(finishedTabPage);
                toDoData.forEach(data => {
                    if(data.status === 'done'){
                        const todos = todoCard(data)

                        finishedTabPage.append(todos);
                    }
                });

                break;
        }
    })

}