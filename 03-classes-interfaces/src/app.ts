// Note: class renamed to Department2 to prevent name conflicts with basics.js

class Department2 {
  protected employees: string[] = []; // protected gives subclasses access to this property, but still protects it from being accessed anywhere else.

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department2) {
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(this: Department2, employee: string) {
    this.employees.push(employee);
  }

  printEmployeesList(this: Department2) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment2 extends Department2 {
  public admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT"); // super must be called before using 'this'
    this.admins = admins;
    // Shorthand initilisation is more conscise though.
  }
}

class AccountingDepartment2 extends Department2 {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found!");
  }

  set mostRecentReport(newReport: string) {
    if (!newReport) {
      throw new Error("Please pass in a valid report!");
    }
    this.addReport(newReport);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // Overriding the base class method
  addEmployee(name: string) {
    if (name === "Steven") {
      return;
    }
    this.employees.push(name);
  }

  addReport(newReport: string) {
    this.reports.push(newReport);
    this.lastReport = newReport;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const it = new ITDepartment2("IT3", ["Steven"]);
// it.describe();
// it.addEmployee("Steven");
// it.printEmployeesList();
// console.log(it);

const accounting2 = new AccountingDepartment2("AC9", []);
accounting2.addReport("Steven stole all the monies");
console.log(accounting2.mostRecentReport);
accounting2.mostRecentReport = "Oh, no. It was Bill again.";
console.log(accounting2.mostRecentReport);
accounting2.printReports();
accounting2.addEmployee("Steven"); // Won't work - see if clause
accounting2.addEmployee("Maria");
console.log(accounting2);
