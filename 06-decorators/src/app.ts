// Note that decorators execute when classes are defined; not when instances of said classes are instantiated.

// Decorator function
// function Logger(constructor: Function) {
//   console.log("Logging");
//   console.log(constructor);
// }

// Decorator Factory - functions that return the expression that will be called by the decorator at runtime. They can take parameters that can be accessed by that expression.
function Logger(logString: string) {
  console.log("I execute first!");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// This decorator factory hooks into the DOM and inserts some content. The decorator function returns a new class with custom logic that preserves the prototype of the the original class. However, that class must have a name member, as is specified in the generic type assignment.
function WithTemplate(template: string, hookId: string) {
  console.log("Template Factory: I execute second!");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("WithTemplate decorator function here!");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// Decorators execute bottom-up. I.e., @WithTemplate will execute first. However, the decorator factory functions (the higher order functions returning the decorators) with execute earlier, and top-down order.
@Logger("Logging: person")
@WithTemplate("<h1>Test</h1>", "output-container")
class Person {
  name = "Steven";

  constructor() {
    console.log("Create a person object");
  }
}

const person = new Person();

// ------

// Property decorators take two arguments:
// 1. The class's constructor function if used for a static member, or
// the prototype of the class if used for an instance member.
// 2. The name of the member.
function LogProductProperty(target: any, propertyName: string | Symbol) {
  console.log("@Log decorator executing");
  console.log({ target, propertyName });
}

// Method decorators take a third argument - the property descriptor. If the decorator function returns anything, it will be used as the method's property descriptor.

function LogProductMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("Method Accessor:");
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

// Note: Accessor decorators can only be applied to the first accessor specified in document order. Because decorators apply to a Property Descriptor (which combines the get and set accessor), they cannot apply to each declaration separately.

function LogProductSetter(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator:");
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

// Parameter decorators can only be used to observe that a parameter has been declared on a method. Its third argument is the ordinal index of the parameter in the parameter list of the function.

function LogMethodParameter(
  target: any,
  propertyKey: string,
  parameterIdx: number
) {
  console.log("Parameter decorator:");
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIdx);
}

class Product {
  @LogProductProperty
  public name: string;
  private _price: number;

  @LogProductSetter
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Price must be a positive number!");
    }
  }

  constructor(name: string, price: number) {
    this.name = name;
    this._price = price;
  }

  @LogProductMethod
  getTaxInclusivePrice(@LogMethodParameter rate: number) {
    return this._price * rate;
  }
}
