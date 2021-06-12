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

//********** Type Guards **********/

const add = (a: Combinable, b: Combinable) => {
  // This is a type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
};

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

useVehicle(v2);
