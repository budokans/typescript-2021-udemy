"use strict";
class Department2 {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesList() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department2.fiscalYear = 2022;
const newEmployee = Department2.createEmployee("James");
console.log(newEmployee);
console.log(Department2.fiscalYear);
class ITDepartment2 extends Department2 {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log("IT Department ID: " + this.id);
    }
}
class AccountingDepartment2 extends Department2 {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found!");
    }
    set mostRecentReport(newReport) {
        if (!newReport) {
            throw new Error("Please pass in a valid report!");
        }
        this.addReport(newReport);
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment2("AC9", []);
        return this.instance;
    }
    describe() {
        console.log("IT Department ID: " + this.id);
    }
    addEmployee(name) {
        if (name === "Steven") {
            return;
        }
        this.employees.push(name);
    }
    addReport(newReport) {
        this.reports.push(newReport);
        this.lastReport = newReport;
    }
    printReports() {
        console.log(this.reports);
    }
}
const it = new ITDepartment2("IT3", ["Steven"]);
it.describe();
const accounting2 = AccountingDepartment2.getInstance();
accounting2.describe();
accounting2.addReport("Steven stole all the monies");
console.log(accounting2.mostRecentReport);
accounting2.mostRecentReport = "Oh, no. It was Bill again.";
console.log(accounting2.mostRecentReport);
accounting2.printReports();
accounting2.addEmployee("Steven");
accounting2.addEmployee("Maria");
console.log(accounting2);
