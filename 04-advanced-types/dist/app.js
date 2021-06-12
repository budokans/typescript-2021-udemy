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
const add = (a, b) => {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
};
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
useVehicle(v2);
