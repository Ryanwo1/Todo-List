import "./styles/index.css";
import logoVersionSvg from "./img/todoist-seeklogo.com.svg";
import logoVersionPng from "./img/todoist-logo.png";

const logoSvg = document.getElementById("logo-svg");


logoSvg.src = logoVersionSvg;

const mainAppTitle = document.getElementById("main-app-title");
const addTaskButton = document.getElementById("new-task-button");

function showInputFieldsForNewtask() {
    const titleOfTaskInputField = document.createElement("input");
    const titleTextParagraph = document.createElement("p");
    titleTextParagraph.innerHTML = "Task Title";

    titleOfTaskInputField.setAttribute("type", "text");
    titleOfTaskInputField.setAttribute("id", "title-input-field");


    const dueDateOfTaskInputField = document.createElement("input");
    const dueDateTextParagraph = document.createElement("p");
    dueDateTextParagraph.innerHTML = "Due Date";

    dueDateOfTaskInputField.setAttribute("type", "text");
    dueDateOfTaskInputField.setAttribute("id", "due-date-input-field");
    dueDateTextParagraph.innerHTML = "Due Date";

    mainAppTitle.append(titleOfTaskInputField);
    mainAppTitle.append(titleTextParagraph);
    mainAppTitle.append(dueDateOfTaskInputField);
    mainAppTitle.append(dueDateTextParagraph);
}

addTaskButton.addEventListener("click", showInputFieldsForNewtask);

let ryan = {
    cool: "fsdsdasssssasd",
}

console.log(ryan);