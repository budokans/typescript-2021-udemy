import { Component } from "./base-component";
import { Autobind } from "../decorators/autobind";
import { projectStateManager } from "../state/project";
import { validate, Validatable } from "../utils/validation";

export class Form extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInput = this.templateChildElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInput = this.templateChildElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.templateChildElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.templateChildElement.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    const validatableTitle: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const validatableDescription: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 1,
    };

    const validatablePeople: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeople)
    ) {
      alert("Please fill out all the form fields!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.peopleInput.value = "";
  }

  @Autobind private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput) && userInput.length === 3) {
      const [title, description, people] = userInput;
      projectStateManager.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
