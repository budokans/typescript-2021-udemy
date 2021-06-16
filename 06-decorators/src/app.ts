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

// Write a method decorator that access the value of the method and binds this to the method.

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      // define a bound function, i.e., a function that returns the original method with a this binding.
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjustedDescriptor;
}

class Printer {
  message = "Clicked!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const button = document.querySelector("button")!;
// button.addEventListener("click", printer.showMessage); // undefined - event listeners bind 'this' to event.target.

// button.addEventListener("click", printer.showMessage.bind(printer)); // Works

button.addEventListener("click", printer.showMessage); // Works because of the Autobind decorator that takes the original method and modifies it to return a bound function.

//************* Validation with Decorators */

// Problem: Type-checking in every 'submit' event listener for every potential type of object is extra code. Better if the validation logic could be reusable for any given class. Enter: decorators.

// Define an interface for the registeredValidators object, in which props that require validation will be registered, as well as an array with the validation types required for each.

interface ValidatorRegistry {
  [className: string]: { [validateableMember: string]: string[] };
}

const registeredValidators: ValidatorRegistry = {};

const addValidator = (
  validateableObjectType: string,
  validateableMember: string,
  validator: string
) => {
  if (!registeredValidators[validateableObjectType]) {
    registeredValidators[validateableObjectType] = {
      [validateableMember]: [validator],
    };
  } else {
    if (!registeredValidators[validateableObjectType][validateableMember]) {
      registeredValidators[validateableObjectType][validateableMember] = [
        validator,
      ];
    } else {
      registeredValidators[validateableObjectType][validateableMember] = [
        ...registeredValidators[validateableObjectType][validateableMember],
        validator,
      ];
    }
  }
};

const Required = (target: any, validateableMemberKey: string) => {
  const validateableObjectType = target.constructor.name;
  addValidator(validateableObjectType, validateableMemberKey, "required");
};

const PositiveNumber = (target: any, validateableMemberKey: string) => {
  const validateableObjectType = target.constructor.name;
  addValidator(validateableObjectType, validateableMemberKey, "positive");
};

const MaxLength = (target: any, validateableMemberKey: string) => {
  const validateableObjectType = target.constructor.name;
  addValidator(validateableObjectType, validateableMemberKey, "max-length");
};

const validate = (obj: any) => {
  // For this object, check the registeredValidators to see if its className is present and therefore there is a configuration object. Return true if not.
  // Iterate over the class members that need validating and for each validator, update isValid to false if validation fails.
  // Return isValid
  const objValidationConfig = registeredValidators[obj.constructor.name];
  if (!objValidationConfig) return true;

  let isValid = true;

  for (const member in objValidationConfig) {
    for (const validator of objValidationConfig[member]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[member];
          break;

        case "positive":
          isValid = isValid && obj[member] > 0;
          break;

        case "max-length":
          isValid = isValid && obj[member].length <= 10;
          break;
      }
    }
  }
  return isValid;
};

class Course {
  @Required @MaxLength public title: string;
  @PositiveNumber public price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const form = document.querySelector("form")!;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const course = new Course(title, price);

  if (!validate(course)) {
    alert("Invalid input. Please try again!");
    return;
  } else {
    alert("Success");
  }
});
