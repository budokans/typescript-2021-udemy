"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    console.log("I execute first!");
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("I execute second!");
    return function (constructor) {
        console.log("WithTemplate decorator function here!");
        const hookEl = document.getElementById(hookId);
        const person = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = person.name;
        }
    };
}
let Person = class Person {
    constructor(name = "Steven") {
        this.name = name;
        console.log("Create a person object");
    }
};
Person = __decorate([
    Logger("Logging: person"),
    WithTemplate("<h1>Test</h1>", "output-container")
], Person);
const person = new Person();
function Log(target, propertyName) {
    console.log("@Log decorator executing");
    console.log({ target, propertyName });
}
class Product {
    constructor(name, price) {
        this.name = name;
        this._price = price;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Price must be a positive number!");
        }
    }
    getTaxInclusivePrice(rate) {
        return this._price * rate;
    }
}
__decorate([
    Log
], Product.prototype, "name", void 0);
const product = new Product("Fish bowl", 50);
console.log(product.getTaxInclusivePrice(1.09));
