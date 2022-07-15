import "./styles/index.css";
import logoVersionSvg from "./img/todoist-seeklogo.com.svg";
import { format, compareAsc } from 'date-fns';

const logoSvg = document.getElementById("logo-svg");
logoSvg.src = logoVersionSvg;

const mainAppTitle = document.getElementById("main-app-title");
const addTaskButton = document.getElementById("new-task-button");
const toDoListMainSection = document.getElementById("todo-list-main-section");

const toDoListMainList = (function () {
    let mainListInstance;
    let numberOfTasks = 0;
    let listOfCurrentTasks = [];


    function createInstance() {
        let object = new Object();
        return object;
    }

    function addTask(individualTask) {
        listOfCurrentTasks.push(individualTask);
        this.numberOfTasks++;
        
        return numberOfTasks;
    }

    return {
        numberOfTasks,
        getInstance: function () {
            if (!mainListInstance) {
                mainListInstance = createInstance();
            }
            return mainListInstance;
        },
        addTask,
        deleteTask: function(individualTask) {

        },
        showNumberOfTasks: function() {

            console.log(this.numberOfTasks);
        },
        showTasks: function() {
            console.log(listOfCurrentTasks);
        }
    };
})();

function toDoListItemAsObject(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
}



function makeIndividualTaskContainer() {
    const individualTaskContainer = document.createElement("div");
    individualTaskContainer.setAttribute("id", `task-number-${toDoListMainList.numberOfTasks}`)
    individualTaskContainer.classList.add("individual-task")
    return individualTaskContainer;
}

function makeindividualTaskPropertyContainer() {
    const individualTaskNameContainer = document.createElement("div");
    individualTaskNameContainer.classList.add(".task-to-be-added");

    return individualTaskNameContainer;
}

function makeIndividualPropertyLabel(attributeName, attributeValue, buttonText) {
    const individualPropertyLabel = document.createElement("label");
    individualPropertyLabel.setAttribute(`${attributeName}`, `${attributeValue}`);
    individualPropertyLabel.innerHTML = `${buttonText}`;

    return individualPropertyLabel;
}

function createInputBox(arrayOfKeyValuePairings) {
    const inputBox = document.createElement("input");
    
     Object.entries(arrayOfKeyValuePairings).forEach(([key, value]) => {
        inputBox.setAttribute(`${key}`, `${value}`);
    });

    return inputBox;
}

// attributeName: id attributeValue: task-name      attributeName: type, attributeValue text
function showInputFieldsForNewTask() {
    const individualTaskContainerDiv = makeIndividualTaskContainer();
    const individualTaskNameContainerDiv = makeindividualTaskPropertyContainer();
    const individualTaskNameTitle = makeIndividualPropertyLabel("for", "task-name", "Task Name");
    const individualTaskNameInputField = createInputBox({"id": "task-name", "type": "text"});
    const individualDueDateContainer = makeindividualTaskPropertyContainer();
    const individualDueDateLabel = makeIndividualPropertyLabel("for", "due-date", "Due Date");
    const individualDueDateInput = createInputBox({"id": "due-date"});

    // append input box and label to container div
    individualTaskNameContainerDiv.appendChild(individualTaskNameTitle);
    individualTaskNameContainerDiv.appendChild(individualTaskNameInputField);

    //append due date input box and label to individual due date container

    individualDueDateContainer.appendChild(individualDueDateLabel);
    individualDueDateContainer.appendChild(individualDueDateInput);

    // append task name and due date containers to individual task container, forming an individual task on the page.

    individualTaskContainerDiv.appendChild(individualTaskNameContainerDiv);
    individualTaskContainerDiv.appendChild(individualDueDateContainer)

    // append task to list
    toDoListMainSection.append(individualTaskContainerDiv);

    // convert task to object and add to tasklist
    const individualTaskNameAsString = document.getElementById("task-name").value;
    const individualTaskDueDateAsNumber = 0;

    const taskAsObject = new toDoListItemAsObject(individualTaskNameAsString, individualTaskDueDateAsNumber);
    toDoListMainList.addTask(taskAsObject);
    // toDoListMainList.showNumberOfTasks();
    // toDoListMainList.showTasks();
}

addTaskButton.addEventListener("click", showInputFieldsForNewTask);

