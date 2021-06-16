"use strict";
class Form {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.targetElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.attach();
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
const form = new Form();
