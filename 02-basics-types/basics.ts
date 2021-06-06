const add = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  // Avoid these type checks by using TypeScript's static-typing features instead.

  // if (typeof n1 !== "number" || typeof n2 !== "number") {
  //   throw new Error("Incorrect input!");
  // }

  if (showResult) {
    console.log(`${phrase} ${n1 + n2}`);
  } else {
    return n1 + n2;
  }
};

const number1 = 13;

// Initialising a variable with no value and assigning a type is good practice.
// However, because of TypeScript's built in type inference, assigning a type for variables initialised with values is redundant and bad practice.
let number2: number;
number2 = 4.2;
const printResult = true;
const resultPhrase = "The result is: ";

const result = add(number1, number2, printResult, resultPhrase);
