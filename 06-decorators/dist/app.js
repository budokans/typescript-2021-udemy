"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log("I execute first!");
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("Template Factory: I execute second!");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("WithTemplate decorator function here!");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Steven";
        console.log("Create a person object");
    }
};
Person = __decorate([
    Logger("Logging: person"),
    WithTemplate("<h1>Test</h1>", "output-container")
], Person);
const person = new Person();
function LogProductProperty(target, propertyName) {
    console.log("@Log decorator executing");
    console.log({ target, propertyName });
}
function LogProductMethod(target, propertyKey, descriptor) {
    console.log("Method Accessor:");
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
function LogProductSetter(target, propertyKey, descriptor) {
    console.log("Accessor decorator:");
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
function LogMethodParameter(target, propertyKey, parameterIdx) {
    console.log("Parameter decorator:");
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIdx);
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
    LogProductProperty
], Product.prototype, "name", void 0);
__decorate([
    LogProductSetter
], Product.prototype, "price", null);
__decorate([
    LogProductMethod,
    __param(0, LogMethodParameter)
], Product.prototype, "getTaxInclusivePrice", null);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
class Printer {
    constructor() {
        this.message = "Clicked!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const button = document.querySelector("button");
button.addEventListener("click", printer.showMessage);
const registeredValidators = {};
function Required(target, propertyKey) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyKey]: [
            ...registeredValidators[target.constructor.name][propertyKey],
            "required",
        ] });
}
function PositiveNumber(target, propertyKey) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyKey]: [
            ...registeredValidators[target.constructor.name][propertyKey],
            "positive",
        ] });
}
function validate(obj) {
    const objectValidationConfig = registeredValidators[obj.constructor.name];
    if (!objectValidationConfig)
        return true;
    let isValid = true;
    for (const prop in objectValidationConfig) {
        for (const validator of objectValidationConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const course = new Course(title, price);
    if (!validate(course)) {
        alert("Invalid input. Please try again!");
        return;
    }
    else {
        alert("Success");
    }
});
