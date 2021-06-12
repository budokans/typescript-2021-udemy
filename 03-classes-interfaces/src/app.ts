// Note: class renamed to Department2 to prevent name conflicts with basics.js

abstract class Department2 {
  protected employees: string[] = []; // protected gives subclasses access to this property, but still protects it from being accessed anywhere else.
  static fiscalYear = 2022;

  constructor(protected readonly id: string, public name: string) {
    // console.log(this.fiscalYear) // Static properties aren't available on class instances
    // console.log(Department2.fiscalYear); // Fine as fiscalYear is a static method on the class Department2
  }

  static createEmployee(name: string) {
    return { name };
  }

  // describe(this: Department2) {
  //   console.log(`Department ${this.id}: ${this.name}`);
  // }

  // Instances of abstract classes cannot be instantiated; only classes who inherit them may be instantiated. Abstract methods on abstract classes are defined in the abstract class but must be implemented within the inheriting class. They behave like this because implementation details will be unique to each inheriting class and therefore cannot be defined in the base class.
  abstract describe(this: Department): void;

  addEmployee(this: Department2, employee: string) {
    this.employees.push(employee);
  }

  printEmployeesList(this: Department2) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// Calling static methods
const newEmployee = Department2.createEmployee("James");
console.log(newEmployee);
console.log(Department2.fiscalYear);

class ITDepartment2 extends Department2 {
  public admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT"); // super must be called before using 'this'
    this.admins = admins;
    // Shorthand initialisation is more conscise though.
  }

  describe() {
    console.log("IT Department ID: " + this.id);
  }
}

class AccountingDepartment2 extends Department2 {
  private static instance: AccountingDepartment2;
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

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
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

const it = new ITDepartment2("IT3", ["Steven"]);
it.describe();
// it.addEmployee("Steven");
// it.printEmployeesList();
// console.log(it);

// const accounting2 = new AccountingDepartment2("AC9", []); // Won't work - AccountingDepartment2 is a Singleton with a private constructor
const accounting2 = AccountingDepartment2.getInstance();
accounting2.describe();
accounting2.addReport("Steven stole all the monies");
console.log(accounting2.mostRecentReport);
accounting2.mostRecentReport = "Oh, no. It was Bill again.";
console.log(accounting2.mostRecentReport);
accounting2.printReports();
accounting2.addEmployee("Steven"); // Won't work - see if clause
accounting2.addEmployee("Maria");
console.log(accounting2);
