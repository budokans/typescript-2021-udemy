"use strict";
class Form {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.targetElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.titleInput = this.formElement.querySelector("#title");
        this.configure();
        this.attach();
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInput.value);
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler.bind(this));
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
const form = new Form();
