import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { ProjectStatus, Project } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { projectStateManager } from "../state/project.js";
import { DropTarget } from "../models/drag-drop.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DropTarget
{
  private assignedProjects: Project[];
  private listId: string;

  constructor(private listCategory: "active" | "finished") {
    super("project-list", "app", false, `${listCategory}-projects`);
    this.assignedProjects = [];
    this.listId = `${this.listCategory}-projects-list`;
    this.configure();
    this.renderContent();
  }

  @Autobind dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const ulElement = this.templateChildElement.querySelector("ul")!;
      ulElement.classList.add("droppable");
    }
  }

  @Autobind dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectStateManager.moveProject(
      projectId,
      this.listCategory === "active"
        ? ProjectStatus.Active
        : ProjectStatus.Finished
    );
  }

  @Autobind dragLeaveHandler(_: DragEvent) {
    const ulElement = this.templateChildElement.querySelector("ul")!;
    ulElement.classList.remove("droppable");
  }

  configure() {
    this.templateChildElement.addEventListener(
      "dragover",
      this.dragOverHandler
    );
    this.templateChildElement.addEventListener("drop", this.dropHandler);
    this.templateChildElement.addEventListener(
      "dragleave",
      this.dragLeaveHandler
    );

    projectStateManager.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.listCategory === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    this.templateChildElement.querySelector("ul")!.id = this.listId;
    const headingContent = `${this.listCategory.toUpperCase()} PROJECTS`;
    this.templateChildElement.querySelector("h2")!.textContent = headingContent;
  }

  private renderProjects() {
    const projectsUl = document.getElementById(
      `${this.listCategory}-projects-list`
    ) as HTMLUListElement;
    projectsUl.innerHTML = "";

    for (const project of this.assignedProjects) {
      new ProjectItem(this.listId, project);
    }
  }
}
