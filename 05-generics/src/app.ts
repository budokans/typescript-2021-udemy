// ********** Built-in Generic types **********//

// Generic types like Array or Promise need arguments to determine the type of data that will be inside the array / yielded by the promise. E.g.

// const names: Array = []; // Array is a generic type that needs a type argument.
const names: Array<string> = []; // This is the same as assigning type string[]
// names[0].split(" "); // This string method works because type string is inferred. However, it works even if the array is empty and will cause a runtime error - something to watch out for.

// The Promise type is also generic and requires one argument. The argument specifies what data type the promise will yield.
const promise: Promise<string> = new Promise((resolve, reject) => {
  let error = false;

  setTimeout(() => {
    resolve("This promise has resolved");
  }, 2000);

  if (error) {
    reject("This promise has rejected.");
  }
});

promise.then((data) => data.split(" ")); // Fine, as the promise's resolve/reject type has been assigned above using the Promise<> generic.

// ********** Generic Functions **********//

// const merge = (objA: object, objB: object) => {
//   return Object.assign(objA, objB);
// };

// const mergedObj = merge({ name: "Steven", hobbies: ["Drums"] }, { age: 32 });
// console.log(mergedObj); // {name: "Steven", hobbies: Array(1), age: 32}
// console.log(mergedObj.name); // TypeError - property name doesn't exist on type object.

const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// Note: Use the extends keyword in generics to be more specific. Without it, T can represent any data type and passing, for example, to the caller wouldn't cause an error and would just fail silently.

// const mergedObj = merge({ name: "Steven", hobbies: ["Drums"] }, 32); TypeError
const mergedObj = merge({ name: "Steven", hobbies: ["Drums"] }, { age: 32 }); // Fine
console.log(mergedObj.name); // Fine - now TypeScript understands that the function will return an intersection of the types provided by the caller, and the name property exists on one of the types provided by the caller.

// Define an interface to use as a constraint in the generic function below.

interface Lengthy {
  length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T) => {
  let description = "Got no value.";
  if (element.length === 1) {
    description = `Got 1 element.`;
  } else if (element.length > 1) {
    description = `Got ${element.length} elements.`;
  }
  return [element, description];
};

console.log(countAndDescribe("Stringyyyy"));
// console.log(countAndDescribe(10)); // Type error - argument number is not assignable to parameter of type Lengthy

// ********** keyof Constraint **********//

// The keyof constraint indicates that the data type is a key of a specific object.
const extractAndConvert = <T, U extends keyof T>(obj: T, key: U) => {
  console.log(`Value: ${obj[key]}`);
};

extractAndConvert({ age: 100 }, "age"); // Works fine
// extractAndConvert({ name: "Steven" }, "age"); // Argument of type "age" isn't assignable to type "name"

// ********** Generic Classes **********//

class DataStorage<T extends string | number | boolean> {
  private data: Array<T> = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (!this.data.indexOf(item)) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return this.data;
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Steven");
textStorage.addItem("James");
textStorage.addItem("Joel");
textStorage.removeItem("Steven");
const allTextItems = textStorage.getItems();
console.log(allTextItems);

const numberStorage = new DataStorage<number>();

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: "Steven" });
// objectStorage.addItem({ name: "James" });
// objectStorage.removeItem({ name: "Steven" }); // Won't work as Object.indexOf is not a function. Therefore, assign accepted types for T when defining the generic type.
// const allObjectItems = objectStorage.getItems();
// console.log(allObjectItems);

// ********** Generic Utility Types **********//

// The Partial generic utility type can be used to signify that a piece of data will eventually be of type <T> - perhaps some validation needs to happen before the properties can be assigned to it.

// When returning the data of type <T>, it must also be type cast as type T for this to work.

interface CourseGoal {
  title: string;
  description: string;
  completeDate: Date;
}

const createCourseGoal = (
  title: string,
  description: string,
  date: Date
): CourseGoal => {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeDate = date;
  return courseGoal as CourseGoal;
};

// The Readonly generic utility type can be used to declare that a data type is.. well, read-only.

const drummers: Readonly<string[]> = ["Vinnie", "Steve"];
// drummers.push("Travis") // HAH no.
