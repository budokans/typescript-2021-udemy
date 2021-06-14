//********** Intersection Types **********/

// The same can be achieved with interfaces but this is less code.

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type SeniorEmployee = Admin & Employee;

const senior: SeniorEmployee = {
  name: "Steven",
  privileges: ["Parking Space", "Business Class"],
  startDate: new Date(),
};

const junior: Employee = {
  name: "Michael",
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// let universalData: Universal = "Hello"; // Type error - The intersecting types do not have "string" in common.

let universalData = 50; // Fine

//********** Type Guards and Function Overloads **********/

// Type guards are useful when working with union types - if union types are passed as arguments to a function, the operations performed on the data may change depending on the specific type of data.

// Function overloads are helpful when the TypeScript isn't specfic enough in its .inference of the return type

// These are function overloads.
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: Combinable, b: Combinable) {
  // This is a type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result = add("Steven", "Webster");
// result.split(" ") // Without function overloads: Error: 'split' doesn't exist on type string | number.

type UnknownEmployee = Employee | Admin;

const printEmployeeInfo = (emp: UnknownEmployee) => {
  // Type guards for objects
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start date: " + emp.startDate);
  }
};

printEmployeeInfo(senior);
printEmployeeInfo(junior);

class Car {
  drive() {
    console.log("Driving a car!");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck!");
  }

  loadCargo(amount: number) {
    console.log("Loading " + amount + " units of cargo!");
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();

  // Type guards for instances of classes
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(2000);
  }
};

useVehicle(v1);
useVehicle(v2);

//********** Discriminated Unions **********/

// A useful pattern that serves as an alternative for type guards. When working with complex union types, having a common literal type property in each interface makes it possible to determine which type is being passed to the function when the function parameter is a union type, and which operation to perform depending on that type. One way to do that is with a switch statement.

type Eagle = {
  type: "air";
  flyingSpeed: number;
};

type Jaguar = {
  type: "land";
  runningSpeed: number;
};

type Animal = Eagle | Jaguar;

const moveAnimal = (animal: Animal) => {
  let movementVerb;
  let speed;
  switch (animal.type) {
    case "air":
      movementVerb = "Flying";
      speed = animal.flyingSpeed;
      break;
    case "land":
      movementVerb = "Running";
      speed = animal.runningSpeed;
      break;
  }
  console.log(`${movementVerb} at speed ${speed} km/hr`);
};

moveAnimal({ type: "air", flyingSpeed: 60 });

//********** Type Casting **********/

// Do this when TypeScript isn't able to infer the type correctly, but be sure that the type is correct otherwise you will run into runtime errors.

// Option 1. can create problems with JSX compilation problems when using React
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");

// Option 2.
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;

userInputElement.value = "Foo";

//********** Index Types **********/

// Use index types when you want flexibility about the entity's property names but still want to define the types of the property names themselves.

interface ErrorContainer {
  // id: number; // Property 'id' of type 'number' is not assignable to string index type 'string'.
  // id: string; // Fine - it's okay to set specific types as well, as long as their property types and types are the same;
  [propName: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Must be a valid email",
  username: "Must be shorter than 32 characters!",
};

//********** Optional Chaining **********/

const fetchedUserData = {
  id: "0393ddbe",
  name: "Steven",
  // job: {
  //   title: "Developer",
  //   description: "Develops",
  // },
};

// These will compile and return undefined because TypeScript is able to detect that job is not a property on fetchedUserData, but it's still useful if you're fetching DATA from an API and it's uncertain whether the property will exist.

// console.log(fetchedUserData.job && fetchedUserData.job.title); // undefined
// console.log(fetchedUserData.job?.title); // undefined

//********** Nullish Coalescing **********/

// Use the ?? nullish coalesching operator if you want to specify undefined or null, rather than any falsy value.

const user2Input = "";
const storedData = user2Input || "DEFAULT";
const storedData2 = user2Input ?? "DEFAULT";

console.log(storedData); // "DEFAULT" as "" is falsy;
console.log(storedData2); // "" as "" is neither null nor undefined.
