"use strict";
const senior = {
    name: "Steven",
    privileges: ["Parking Space", "Business Class"],
    startDate: new Date(),
};
const junior = {
    name: "Michael",
    startDate: new Date(),
};
let universalData = 50;
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add("Steven", "Webster");
const printEmployeeInfo = (emp) => {
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
    loadCargo(amount) {
        console.log("Loading " + amount + " units of cargo!");
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(2000);
    }
};
useVehicle(v1);
useVehicle(v2);
const moveAnimal = (animal) => {
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
const userInputElement = document.getElementById("user-input");
userInputElement.value = "Foo";
const errorBag = {
    email: "Must be a valid email",
    username: "Must be shorter than 32 characters!",
};
const fetchedUserData = {
    id: "0393ddbe",
    name: "Steven",
};
const user2Input = "";
const storedData = user2Input || "DEFAULT";
const storedData2 = user2Input !== null && user2Input !== void 0 ? user2Input : "DEFAULT";
console.log(storedData);
console.log(storedData2);
