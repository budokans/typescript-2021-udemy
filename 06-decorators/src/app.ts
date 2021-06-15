// Note that decorators execute when classes are defined; not when instances of said classes are instantiated.

// Decorator function
// function Logger(constructor: Function) {
//   console.log("Logging");
//   console.log(constructor);
// }

// Decorator Factory - functions that take arguments that can be accessed by the returned decorator function.
function Logger(logString: string) {
  console.log("I execute first!");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// This decorator factory hooks into the DOM and inserts some content.
function WithTemplate(template: string, hookId: string) {
  console.log("I execute second!");
  return function (constructor: new () => Person) {
    console.log("WithTemplate decorator function here!");
    const hookEl = document.getElementById(hookId);
    const person = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = person.name;
    }
  };
}

// Decorators execute bottom-up. I.e., @WithTemplate will execute first. However, the decorator factory functions (the higher order functions returning the decorators) with execute earlier, and top-down order.
@Logger("Logging: person")
@WithTemplate("<h1>Test</h1>", "output-container")
class Person {
  constructor(public name = "Steven") {
    console.log("Create a person object");
  }
}

const person = new Person();
