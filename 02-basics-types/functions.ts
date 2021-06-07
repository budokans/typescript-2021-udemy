//************ Returns types and void ************/

// Mostly, it's redundant to assign a return type as TypeScript easily infers it.
// Functions that don't return any data or have no return statement and return undefined have a return type of void;

const add = (n1: number, n2: number) => n1 + n2;

// Even though this function evaluates to undefined in JavaScript, the TypeScript type undefined should only be used when there is a return statement that and no data is returned from the function.

// const printResult = (num: number): undefined => console.log(`Result: ${num}`); // Don't do this

const printResult = (num: number): void => console.log(`Result: ${num}`); // This is unnecessary because of return type inference, but it is the correct type.

printResult(add(5, 19));

//************ Functions as types ************/

// let combineValue;

// combineValue = add;
// combineValue = 3;
// console.log(combineValue(8, 8)); // No TypeError at compilation time because combineValue has a type of "any"

// // To fix this, initialise the variable with the Function type assigned.

// let combineValue: Function;
// combineValue = add;

// // However, problems can arise as is still possible to call combineValue with the wrong number of and/or type of arguments.

// combineValue = printResult;
// console.log(combineValue(8, 8));
// // Result: 8
// // undefined
// // printResult console.logs 8, then the return value of print result (undefined) is logged.

// Instead, define the Function along with its parameter types and return type

let combineValues: (a: number, b: number) => number;
// combineValues = printResult; // TypeError
// combineValues = 5; // TypeError
combineValues = add;

// console.log(combineValues(5)); // Error: expected 2 arguments, but got 1
console.log(combineValues(8, 191)); // Fine

// Working with callbacks

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
};

// Note that even if you were to return a value from the callback, the return type of void won't result in an error. By using void, you are specifying that the value of the callback will be ignored.

// It is safer than using any, because unintentionally operating on the return value of the callback function will not cause an error in that case, whereas by using void, you are deliberately declaring that the return value will not be used.

addAndHandle(32, 93, (num) => console.log(num));
