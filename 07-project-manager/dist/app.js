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
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(newListener) {
        this.listeners.push(newListener);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const id = Math.random().toString();
        const project = new Project(id, title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(project);
        this.callListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((proj) => proj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.callListeners();
        }
    }
    callListeners() {
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
class Component {
    constructor(templateId, destinationElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.destinationElement = document.getElementById(destinationElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.templateChildElement = importedNode.firstElementChild;
        if (newElementId) {
            this.templateChildElement.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.destinationElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.templateChildElement);
    }
}
class ProjectItem extends Component {
    constructor(destinationId, project) {
        super("single-project", destinationId, true, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get contributors() {
        if (this.project.people > 1) {
            return `${this.project.people} contributors`;
        }
        return "1 contributor.";
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("End");
    }
    configure() {
        this.templateChildElement.addEventListener("dragstart", this.dragStartHandler);
        this.templateChildElement.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.destinationElement.querySelector("h2").textContent =
            this.project.title;
        this.destinationElement.querySelector("h3").textContent =
            this.contributors;
        this.destinationElement.querySelector("p").textContent =
            this.project.description;
    }
}
__decorate([
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Autobind
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectList extends Component {
    constructor(listCategory) {
        super("project-list", "app", false, `${listCategory}-projects`);
        this.listCategory = listCategory;
        this.assignedProjects = [];
        this.listId = `${this.listCategory}-projects-list`;
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const ulElement = this.templateChildElement.querySelector("ul");
            ulElement.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        projectStateManager.moveProject(projectId, this.listCategory === "active"
            ? ProjectStatus.Active
            : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const ulElement = this.templateChildElement.querySelector("ul");
        ulElement.classList.remove("droppable");
    }
    configure() {
        this.templateChildElement.addEventListener("dragover", this.dragOverHandler);
        this.templateChildElement.addEventListener("drop", this.dropHandler);
        this.templateChildElement.addEventListener("dragleave", this.dragLeaveHandler);
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
    }
    renderContent() {
        this.templateChildElement.querySelector("ul").id = this.listId;
        const headingContent = `${this.listCategory.toUpperCase()} PROJECTS`;
        this.templateChildElement.querySelector("h2").textContent = headingContent;
    }
    renderProjects() {
        const projectsUl = document.getElementById(`${this.listCategory}-projects-list`);
        projectsUl.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.listId, project);
        }
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
class Form extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInput = this.templateChildElement.querySelector("#title");
        this.descriptionInput = this.templateChildElement.querySelector("#description");
        this.peopleInput = this.templateChildElement.querySelector("#people");
        this.configure();
    }
    configure() {
        this.templateChildElement.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
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
}
__decorate([
    Autobind
], Form.prototype, "submitHandler", null);
const form = new Form();
const projListActive = new ProjectList("active");
const projListComplete = new ProjectList("finished");
