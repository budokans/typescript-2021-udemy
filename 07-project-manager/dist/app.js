"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        },
    };
    return adjustedDescriptor;
}
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
        this.formElement.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
__decorate([
    Autobind
], Form.prototype, "submitHandler", null);
const form = new Form();
