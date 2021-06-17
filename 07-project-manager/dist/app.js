"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addListener(newListener) {
        this.listeners.push(newListener);
    }
    addProject(title, description, numOfPeople) {
        const id = Math.random().toString();
        const project = new Project(id, title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(project);
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}
const projectStateManager = ProjectState.getInstance();
function validate(validatableInput) {
    const inputValue = validatableInput.value;
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && inputValue.toString().trim().length > 0;
    }
    if (validatableInput.minLength != null && typeof inputValue === "string") {
        isValid = isValid && inputValue.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof inputValue === "string") {
        isValid = isValid && inputValue.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof inputValue === "number") {
        isValid = isValid && inputValue >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof inputValue === "number") {
        isValid = isValid && inputValue <= validatableInput.max;
    }
    return isValid;
}
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const newDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        },
    };
    return newDescriptor;
}
class ProjectList {
    constructor(listCategory) {
        this.listCategory = listCategory;
        this.templateElement = document.getElementById("project-list");
        this.targetElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importedNode.firstElementChild;
        this.assignedProjects = [];
        projectStateManager.addListener((projects) => {
            const relevantProjects = projects.filter((project) => {
                if (this.listCategory === "active") {
                    return project.status === ProjectStatus.Active;
                }
                else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const projectsUl = document.getElementById(`${this.listCategory}-projects-list`);
        projectsUl.innerHTML = "";
        for (const project of this.assignedProjects) {
            const listEl = document.createElement("li");
            listEl.textContent = project.title;
            projectsUl.appendChild(listEl);
        }
    }
    renderContent() {
        this.sectionElement.id = `${this.listCategory}-projects`;
        const listId = `${this.listCategory}-projects-list`;
        this.sectionElement.querySelector("ul").id = listId;
        const headingContent = `${this.listCategory.toUpperCase()} PROJECTS`;
        this.sectionElement.querySelector("h2").textContent = headingContent;
    }
    attach() {
        this.targetElement.insertAdjacentElement("beforeend", this.sectionElement);
    }
}
class Form {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.targetElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.titleInput = this.formElement.querySelector("#title");
        this.descriptionInput = this.formElement.querySelector("#description");
        this.peopleInput = this.formElement.querySelector("#people");
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;
        const validatableTitle = {
            value: enteredTitle,
            required: true,
        };
        const validatableDescription = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };
        const validatablePeople = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (!validate(validatableTitle) ||
            !validate(validatableDescription) ||
            !validate(validatablePeople)) {
            alert("Please fill out all the form fields!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.peopleInput.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput) && userInput.length === 3) {
            const [title, description, people] = userInput;
            projectStateManager.addProject(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
__decorate([
    Autobind
], Form.prototype, "submitHandler", null);
const form = new Form();
const projListActive = new ProjectList("active");
const projListComplete = new ProjectList("finished");
