// State Management

class ProjectState {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addListener(newListener: Function) {
    this.listeners.push(newListener);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const id = Math.random().toString();
    const project = {
      id,
      title,
      description,
      people: numOfPeople,
    };
    this.projects.push(project);

    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}

const projectStateManager = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: Boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
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

// Utilities
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
  private templateElement: HTMLTemplateElement;
  private targetElement: HTMLDivElement;
  private sectionElement: HTMLElement;
  private assignedProjects: any[];

  constructor(private projectStatus: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.targetElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.sectionElement = importedNode.firstElementChild as HTMLElement;
    this.assignedProjects = [];

    projectStateManager.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const projectsUl = document.getElementById(
      `${this.projectStatus}-projects-list`
    ) as HTMLUListElement;
    for (const project of this.assignedProjects) {
      const listEl = document.createElement("li");
      listEl.textContent = project.title;
      projectsUl.appendChild(listEl);
    }
  }

  private renderContent() {
    this.sectionElement.id = `${this.projectStatus}-projects`;

    const listId = `${this.projectStatus}-projects-list`;
    this.sectionElement.querySelector("ul")!.id = listId;

    const headingContent = `${this.projectStatus.toUpperCase()} PROJECTS`;
    this.sectionElement.querySelector("h2")!.textContent = headingContent;
  }

  private attach() {
    this.targetElement.insertAdjacentElement("beforeend", this.sectionElement);
  }
}

class Form {
  private templateElement: HTMLTemplateElement;
  private targetElement: HTMLDivElement;
  private formElement: HTMLFormElement;
  private titleInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private peopleInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.targetElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    this.titleInput = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInput = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

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

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const form = new Form();
const projListActive = new ProjectList("active");
const projListComplete = new ProjectList("finished");
