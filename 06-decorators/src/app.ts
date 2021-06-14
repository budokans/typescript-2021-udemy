// Note that decorators execute when classes are defined; not when instances of said classes are instantiated.

function Logger(constructor: Function) {
  console.log("Logging");
  console.log(constructor);
}

@Logger
class Person {
  constructor(public name = "Steven") {
    console.log("Create a person object");
  }
}

const person = new Person();
