import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get contributors() {
    if (this.project.people > 1) {
      return `${this.project.people} contributors`;
    }
    return "1 contributor.";
  }

  constructor(destinationId: string, project: Project) {
    super("single-project", destinationId, true, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @Autobind dragEndHandler(_: DragEvent) {
    console.log("End");
  }

  configure() {
    this.templateChildElement.addEventListener(
      "dragstart",
      this.dragStartHandler
    );
    this.templateChildElement.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.destinationElement.querySelector("h2")!.textContent =
      this.project.title;
    this.destinationElement.querySelector("h3")!.textContent =
      this.contributors;
    this.destinationElement.querySelector("p")!.textContent =
      this.project.description;
  }
}
