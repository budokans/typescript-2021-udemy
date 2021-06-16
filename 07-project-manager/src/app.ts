// Create a Form class that will get the content in the template and render it to the DOM on instantiation.

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
      console.log({ title, description, people });
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
