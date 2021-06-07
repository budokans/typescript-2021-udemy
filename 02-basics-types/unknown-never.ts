//********** Unknown **********/

let userInput: unknown;
let username: string;

userInput = 5; // Fine
userInput = "Steven"; // Fine
username = userInput; // TypeError - type unknown is not assignable to type string.

// However, if you first perform a check, TypeScript will interpret this assignment as being deliberate and will not error.

if (typeof userInput === "string") {
  username = userInput; // Fine
}

//********** Never **********/
// Utility functions that always throw errors never return anything; logging their value or assigning their return value to a variable fails because the script stops being executed at the throw statement.

// Therefore, such functions have a return type of never. This is inferred by TS, but it can be explicitly assigned for clarity.

const generateError = (message: string, errorCode: string) => {
  throw { message, errorCode };
};
