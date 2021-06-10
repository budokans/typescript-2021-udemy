class Department {
  // private readonly id: string; // See short-hand property initialisation in constructor
  // public name: string;
  private employees: string[] = []; // First, the variable is assigned to a type, then the value of an empty array.

  // The private keyword prevents the value of employees from being modified by any expression outside of the class (bracket notation, push etc).

  constructor(private readonly id: string, public name: string) {
    // These class properties can be initalised with in the brackets on the constructor
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(this: Department, employee: string) {
    this.employees.push(employee);
  }

  printEmployeesList(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("AC4", "Accounting");
accounting.describe();
accounting.addEmployee("Steven");
accounting.printEmployeesList();
// accounting.employees.push("Something"); // Fails - employees is a private property

const accountingCopy = { addEmployee: accounting.addEmployee };
// accountingCopy.addEmployee("Tony"); // Error: wrong/different this context
// console.log(accountingCopy);

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); // returns undefined as this refers to the caller, and accountingCopy has no name property

// const accountingCopy = { name: "Dummy name", describe: accounting.describe };
// accountingCopy.describe(); // Works as a name property is present on the object.
