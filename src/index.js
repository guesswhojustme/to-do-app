import "./styles.css";
import "./ui/modals-style.css"
import { test } from "./ui/to-do-card.js";
import { sideNavControl } from "./controller.js";
import { createWarningModal } from "./ui/modals.js";
import deleteIcon from "./utils/svgs/delete_icon.svg"


const project1Div = document.getElementById('project-1-wrapper');
const project1 = document.getElementById('p1')
const modalObj = createWarningModal();
document.body.appendChild(modalObj.dialog)

const img = document.createElement('img');
img.src = deleteIcon;
img.style.cursor = 'pointer';

// 2. Add hover effects via listeners
img.addEventListener('mouseenter', () => img.style.opacity = '0.7'// Example: dim it slightly on hover
);

img.addEventListener('mouseleave', () => img.style.opacity = '1'  // Reset when mouse leaves
);

img.addEventListener('click', () => modalObj.open())

project1Div.addEventListener('mouseenter', () => project1Div.append(img))

project1Div.addEventListener('mouseleave', () => img.remove())



sideNavControl();
