export class Component {
    constructor(templateId, destinationElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.destinationElement = document.getElementById(destinationElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.templateChildElement = importedNode.firstElementChild;
        if (newElementId) {
            this.templateChildElement.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.destinationElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.templateChildElement);
    }
}
