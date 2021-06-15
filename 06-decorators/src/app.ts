// Note that decorators execute when classes are defined; not when instances of said classes are instantiated.

// Decorator function
// function Logger(constructor: Function) {
//   console.log("Logging");
//   console.log(constructor);
// }

// Decorator Factory - functions that take arguments that can be accessed by the returned decorator function.
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// This decorator factory hooks into the DOM and inserts some content.
function WithTemplate(template: string, hookId: string) {
  return function (constructor: new () => Person) {
    const hookEl = document.getElementById(hookId);
    const person = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = person.name;
    }
  };
}

// @Logger("Logging: person");
@WithTemplate("<h1>Test</h1>", "output-container")
class Person {
  constructor(public name = "Steven") {
    console.log("Create a person object");
  }
}

const person = new Person();
