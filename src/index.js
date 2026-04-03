import "./styles.css";
import "./ui/modals-style.css"
import { sideNavControl } from "./controller.js";
import { renderProjectData } from "./data/data.js";
const projectPage = document.getElementById('#project-page');

sideNavControl();
renderProjectData();