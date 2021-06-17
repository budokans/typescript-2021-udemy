// Project Types

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

// State Management

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(newListener: Listener<T>) {
    this.listeners.push(newListener);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const id = Math.random().toString();
    const project = new Project(
      id,
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  private templateElement: HTMLTemplateElement;
  protected destinationElement: T;
  protected templateChildElement: U;

  constructor(
    templateId: string,
    destinationElementId: string,
    insertAtStart: Boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.destinationElement = document.getElementById(
      destinationElementId
    ) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.templateChildElement = importedNode.firstElementChild as U;

    if (newElementId) {
      this.templateChildElement.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: Boolean) {
    this.destinationElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.templateChildElement
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  constructor(destinationId: string, project: Project) {
    super("single-project", destinationId, true, project.id);
    this.project = project;

    this.renderContent();
  }

  configure() {}
  renderContent() {
    this.destinationElement.querySelector("h2")!.textContent =
      this.project.title;
    this.destinationElement.querySelector("h3")!.textContent =
      this.project.people.toString();
    this.destinationElement.querySelector("p")!.textContent =
      this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assignedProjects: Project[];
  private listId: string;

  constructor(private listCategory: "active" | "finished") {
    super("project-list", "app", false, `${listCategory}-projects`);
    this.assignedProjects = [];
    this.listId = `${this.listCategory}-projects-list`;
    this.configure();
    this.renderContent();
  }

  configure() {
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

class Form extends Component<HTMLDivElement, HTMLFormElement> {
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

const form = new Form();
const projListActive = new ProjectList("active");
const projListComplete = new ProjectList("finished");
