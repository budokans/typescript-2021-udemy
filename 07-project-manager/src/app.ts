// Create a Form class that will get the content in the template and render it to the DOM on instantiation.

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

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInput.value);
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const form = new Form();
