export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
