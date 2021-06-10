"use strict";
class Department2 {
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
class ITDepartment2 extends Department2 {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
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
const accounting2 = new AccountingDepartment2("AC9", []);
accounting2.addReport("Steven stole all the monies");
console.log(accounting2.mostRecentReport);
accounting2.mostRecentReport = "Oh, no. It was Bill again.";
console.log(accounting2.mostRecentReport);
accounting2.printReports();
accounting2.addEmployee("Steven");
accounting2.addEmployee("Maria");
console.log(accounting2);
