var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { ProjectStatus } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { projectStateManager } from "../state/project.js";
export class ProjectList extends Component {
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
