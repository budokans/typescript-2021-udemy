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

@Logger("Logging: person")
class Person {
  constructor(public name = "Steven") {
    console.log("Create a person object");
  }
}

const person = new Person();
