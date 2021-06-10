"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department ${this.id}: ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesList() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department("AC4", "Accounting");
accounting.describe();
accounting.addEmployee("Steven");
accounting.printEmployeesList();
const accountingCopy = { addEmployee: accounting.addEmployee };
