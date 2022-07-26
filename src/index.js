"use strict";

import "./styles/index.css";
import logoVersionSvg from "./img/todoist-seeklogo.com.svg";
import { format, compareAsc } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const logoSvg = document.getElementById("logo-svg");
logoSvg.src = logoVersionSvg;

const mainAppTitle = document.getElementById("main-app-title");
const addTaskButton = document.getElementById("new-task-button");
const addProjectButton = document.getElementById("new-project-button");
const toDoListMainSection = document.getElementById("todo-list-main-section");
const todoMainProjectSection = document.getElementById("projects-container");
const appState = (function () {
    let newTaskInputBoxesAppearing = false;
    let newProjectInputBoxesAppearing = false;

    return {
        getStateOfNewTaskBoxes: function() {return newTaskInputBoxesAppearing;},
        toggleStateOfNewTaskBoxes: function() {newTaskInputBoxesAppearing = !newTaskInputBoxesAppearing;},
        getStateOfNewProjectBoxes: function() {return newProjectInputBoxesAppearing;},
        toggleStateOfNewProjectBoxes: function() {newProjectInputBoxesAppearing = !newProjectInputBoxesAppearing;},
    }
})();

const listOfProjects = (function() {
    const currentProjects = [];
    return {
        getCurrentProjects: function() {return currentProjects;},
        showCurrentProjects: function() {console.log(currentProjects);},
        isProjectListEmpty: function() {return !currentProjects.length;},
        addNewProject: function() {currentProjects.push(toDoListMainList.getTasks());},
        getNumberOfProjects: function() {return currentProjects.length + 1;},
        showNumberOfProjects: function() {return currentProjects.length + 1;},
        currentProjects

    }
})();

const individualProject = (function() {
    let title;
    let listOfTasks = []
    let numberOfTasks = 0;

    return {
        setTitle(newTitleName) {this.title = newTitleName;},
        getTitle() {return this.title;},
        getListOfTasks() {return this.listOfTasks;},
        addTask(task) {
            listOfTasks.push(task);
            this.numberOfTasks++
            // might need to return numberoftasks..
        },
        getNumberOfTasks() {
            return this.numberOfTasks;
        }
        
    }
})();



const currentTaskWaitingToBeAdded = (function () {
    let taskName;
    let dueDate;

    return {
        getTaskName: function() {return taskName;},
        setTaskName: function(newName) {taskName = newName},
        getDueDate: function() {return dueDate;},
        setDueDate: function(newDueDate) {dueDate = newDueDate},
    }
})();

const toDoListMainList = (function () {
    let mainListInstance;
    let currentProject;
    let numberOfTasksInAllProjects = 0;
    let listOfCurrentTasksInAllProjects = [];

    function createInstance() {
        let object = new Object();
        return object;
    }

    function getNumberOfTasks() {
        return this.numberOfTasks;
    }

    function addTask(individualTask) {
        listOfCurrentTasksInAllProjects.push(individualTask);
        this.numberOfTasks++;
        
        return numberOfTasksInAllProjects;
    }

    return {
        numberOfTasks: numberOfTasksInAllProjects,
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
            console.log(listOfCurrentTasksInAllProjects);
        },
        getTasks: function() {
            return this.listOfCurrentTasks;
        },
        getNumberOfTasks,
        getCurrentProject: function() {
            return this.currentProject;
        },
        setCurrentProject: function(projectName) {
            this.currentProject = projectName;
        },
    };
})();

function toDoListItemAsObject(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
}




function makeIndividualTaskContainer() {
    const individualTaskContainer = document.createElement("div");
    individualTaskContainer.setAttribute("id", `task-number-${toDoListMainList.numberOfTasks}`)
    individualTaskContainer.classList.add("individual-task");
    return individualTaskContainer;
}

function makeIndividualProjectContainer() {
    const projectTaskContainer = document.createElement("div");
    projectTaskContainer.setAttribute("id", `project-number-${listOfProjects.getNumberOfProjects()}`);
    projectTaskContainer.classList.add("individual-task");
    return projectTaskContainer;
}

function makePropertyContainer() {
    const individualTaskNameContainer = document.createElement("div");
    individualTaskNameContainer.classList.add(".individual-task");

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


function displayAddNewTaskToListButton(functionToAddToListener) {
    const finalizeAddTaskButton = document.createElement("button");
    finalizeAddTaskButton.setAttribute("type", "button");
    finalizeAddTaskButton.innerHTML = "+";
    finalizeAddTaskButton.setAttribute("id", "add-button");
    // eventlistener will add to task list when clicked
    finalizeAddTaskButton.addEventListener("click", functionToAddToListener);
    return finalizeAddTaskButton;
}

function addNewProjectToListButton() {

}

function showInputFieldsForNewProject() {
    const projectTaskContainerDiv = makeIndividualProjectContainer();
    const projectTaskNameContainerDiv = makePropertyContainer();
    
    if (appState.getStateOfNewTaskBoxes()) {
        alert("only 1 box at a time!");
        return;
    }

    appState.toggleStateOfNewProjectBoxes();

    const individualProjectNameTitle = makeIndividualPropertyLabel("for", "task-name", "Project Name");
    const individualProjectNameInputField = createInputBox({"id": "task-name", "type": "text", "required": "true"});
    const individualPriorityContainer = makePropertyContainer();
    const individualPriorityLabel = makeIndividualPropertyLabel("for", "priority", "Priority");
    const individualPriorityInput = createInputBox({"id": "priority", "type": "range", "required": "true", "min": 0, "max": 10});


    // // append input box and label to container div
    projectTaskNameContainerDiv.appendChild(individualProjectNameTitle);
    projectTaskNameContainerDiv.appendChild(individualProjectNameInputField);


    // //append priority input box and label to individual priority container
    individualPriorityContainer.appendChild(individualPriorityLabel);
    individualPriorityContainer.appendChild(individualPriorityInput);

    // // append task name and due date containers to individual task container, forming an individual task on the page.
    projectTaskContainerDiv.appendChild(projectTaskNameContainerDiv);
    projectTaskContainerDiv.appendChild(individualPriorityContainer);
    projectTaskContainerDiv.appendChild(displayAddNewTaskToListButton(addProjectToList));

    // // append task to list
    toDoListMainSection.append(projectTaskContainerDiv);

}

function addProjectToList() {

}


function showInputFieldsForNewTask() {

    // if (listOfProjects.isProjectListEmpty()) {
    //     alert("Make a project first!");
    //     return;
    // }

    if (appState.getStateOfNewTaskBoxes()) {
        alert("only 1 box at a time!");
        return;
    }



    // toggle to true if we currently have a task to be added
    appState.toggleStateOfNewTaskBoxes();

    const individualTaskContainerDiv = makeIndividualTaskContainer();
    const individualTaskNameContainerDiv = makePropertyContainer();
    const individualTaskNameTitle = makeIndividualPropertyLabel("for", "task-name", "Task Name");
    const individualTaskNameInputField = createInputBox({"id": "task-name", "type": "text", "required": "true"});
    const individualDueDateContainer = makePropertyContainer();
    const individualDueDateLabel = makeIndividualPropertyLabel("for", "due-date", "Due Date");
    const individualDueDateInput = createInputBox({"id": "due-date", "type": "date", "required": "true"});


    // append input box and label to container div
    individualTaskNameContainerDiv.appendChild(individualTaskNameTitle);
    individualTaskNameContainerDiv.appendChild(individualTaskNameInputField);


    //append due date input box and label to individual due date container

    individualDueDateContainer.appendChild(individualDueDateLabel);
    individualDueDateContainer.appendChild(individualDueDateInput);

    // append task name and due date containers to individual task container, forming an individual task on the page.

    individualTaskContainerDiv.appendChild(individualTaskNameContainerDiv);
    individualTaskContainerDiv.appendChild(individualDueDateContainer)
    individualTaskContainerDiv.appendChild(displayAddNewTaskToListButton(addTaskToList));

    // append task to list
    toDoListMainSection.append(individualTaskContainerDiv);


    // toDoListMainList.showNumberOfTasks();
    // toDoListMainList.showTasks(); 
}

function addTaskToList() {
    currentTaskWaitingToBeAdded.setTaskName(document.getElementById("task-name").value);
    const individualTaskDueDateAsOriginalString = document.getElementById("due-date").value;

    if (individualTaskDueDateAsOriginalString) {
        const individualTaskDueDateAsStringFormatted = format(parseISO(individualTaskDueDateAsOriginalString), 'MM/dd/yyyy');
        currentTaskWaitingToBeAdded.setDueDate(individualTaskDueDateAsStringFormatted);
    }
    console.log(currentTaskWaitingToBeAdded.getTaskName());
    console.log(currentTaskWaitingToBeAdded.getDueDate());


    if (!currentTaskWaitingToBeAdded.getTaskName() || !currentTaskWaitingToBeAdded.getDueDate()) {
        return
    }

    // convert task to object and add to tasklist
    const taskAsObject = new toDoListItemAsObject(currentTaskWaitingToBeAdded.getTaskName(), currentTaskWaitingToBeAdded.getDueDate());
    toDoListMainList.addTask(taskAsObject);

    const individualTaskContainerDiv = makeIndividualTaskContainer();
    const individualTaskNameContainerDiv = makePropertyContainer();
    const individualDueDateContainer = makePropertyContainer();
    individualTaskNameContainerDiv.innerHTML = `${toDoListMainList.getNumberOfTasks()}.\u00A0\u00A0\u00A0${currentTaskWaitingToBeAdded.getTaskName()}`;
    individualDueDateContainer.innerHTML = currentTaskWaitingToBeAdded.getDueDate();

    individualTaskContainerDiv.appendChild(individualTaskNameContainerDiv);
    individualTaskContainerDiv.appendChild(individualDueDateContainer);


    const mainHeading = document.getElementById("main-app-title");
    mainHeading.appendChild(individualTaskContainerDiv);

    removeInputFields(mainHeading);

    appState.toggleStateOfNewTaskBoxes();

}

function removeInputFields(parentNode) {
    const matches = document.querySelectorAll("main > div");
        matches.forEach(function(node) {
            node.remove();
      });
}

addTaskButton.addEventListener("click", showInputFieldsForNewTask);
addProjectButton.addEventListener("click", showInputFieldsForNewProject);


