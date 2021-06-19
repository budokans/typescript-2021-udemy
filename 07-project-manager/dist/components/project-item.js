var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { Autobind } from "../decorators/autobind.js";
export class ProjectItem extends Component {
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
