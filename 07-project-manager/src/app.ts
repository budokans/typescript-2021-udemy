// Create a Form class that will get the content in the template and render it to the DOM on instantiation.

class Form {
  private templateElement: HTMLTemplateElement;
  private targetElement: HTMLDivElement;
  private formElement: HTMLFormElement;

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
    this.attach();
  }

  private attach() {
    this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const form = new Form();
