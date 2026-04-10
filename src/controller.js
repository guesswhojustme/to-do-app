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
                    // 2. Remove item at that index
                    projectData.splice(index, 1); 
                    
                    // 3. Save the now-shorter array
                    localStorage.setItem('projectTitles', JSON.stringify(projectData));
                }

                for (let i = toDoData.length - 1; i >= 0; i--) {
                        if (toDoData[i].id === currentTargetDiv.id) {
                            toDoData.splice(i, 1);
                        }
                    }
                localStorage.setItem('todos', JSON.stringify(toDoData));
                
                currentTargetDiv.remove();
                pageContainer.removeChild(pageContainer.firstChild);
                importantTabState();
                upcomingTabState();
                todayTabState();
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

function createPage(pageName, tabTitle, tabInfo){
    const page = document.createElement('div');
    page.id = pageName;
    const span = document.createElement('span')
    span.textContent = tabTitle;

    Object.assign(span.style, {
        fontWeight: 'bold',
        fontSize: '26px',
        color: 'var(--primaryTextColor)',
        paddingBottom: '10px',
        width: '1035px'
    })

    page.append(span);
        Object.assign(page.style, {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '20px'
        })
    pageContainer.append(page);

    let compare = '';
    const dateToday = format(new Date(), 'yyyy-MM-dd');

    if(tabInfo === 'status'){
        compare = 'done';
    } else if (tabInfo === 'priority'){
        compare = 'high'
    } else if (tabInfo === 'dueDate') {
        compare = dateToday;
    }

    if(pageName !== 'upcomingTodosPage'){
        toDoData.forEach(data => {
                if(data[tabInfo] === compare){
                    const todos = todoCard(data)

                    page.append(todos);
                }
            });
    } else {
        toDoData.forEach(data => {
                    if(isTomorrow(data[tabInfo])){
                        const todos = todoCard(data)

                        page.append(todos);
                    }
                })
    }
    
}

export function importantTabState(){
    let importantValCounter = 0;
    toDoData.forEach(data => {
        if(data.priority === "high"){
            importantValCounter++
        }
    })
    function count(counter){
        const importantVal = document.getElementById('importantTodos');
    importantVal.textContent = counter;
    }

    count(importantValCounter)
}

importantTabState();

export function todayTabState(){
    let todayValCounter = 0;
    const dateToday = format(new Date(), 'yyyy-MM-dd');
    toDoData.forEach(data => {
        if(data.dueDate === dateToday){
            todayValCounter++;
        }
    })

    function count(counter){
        const todayVal = document.getElementById('todayTodos');
        todayVal.textContent = counter;
    }

    count(todayValCounter)
}

todayTabState();

export function upcomingTabState(){
    let upcomingValCounter = 0;
    toDoData.forEach(data => {
    if(isTomorrow(data.dueDate)){
        upcomingValCounter++
        }
    })

    function count(counter){
    const upcomingVal = document.getElementById('upcomingTodos');
    upcomingVal.textContent = counter;
    }

    count(upcomingValCounter)
}

upcomingTabState();

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
                // createPage('todayTodosPage', 'Today Tasks', 'dueDate');
                
                break;
            case 'upcoming-tab':
                console.log("upcoming tab has been clicked");
                removePageContainerChild();

                // createPage('upcomingTodosPage', 'Upcoming Tasks', 'dueDate');
                
                break;
            case 'important-tab':
                console.log("important tab has been clicked");
                removePageContainerChild();

                // createPage('importantTodosPage','Important Tasks', 'priority')

                break;
            case 'finished-tab':
                console.log("finished tab has been clicked");
                removePageContainerChild();
                // createPage('finishedTodosPage','Finished Tasks', 'status')

                break;
        }
    })

}