var add = function (n1, n2, showResult, phrase) {
    // Avoid these type checks by using TypeScript's static-typing features instead.
    // if (typeof n1 !== "number" || typeof n2 !== "number") {
    //   throw new Error("Incorrect input!");
    // }
    if (showResult) {
        console.log(phrase + " " + (n1 + n2));
    }
    else {
        return n1 + n2;
    }
};
var number1 = 13;
// Initialising a variable with no value and assigning a type is good practice.
// However, because of TypeScript's built in type inference, assigning a type for variables initialised with values is redundant and bad practice.
var number2;
number2 = 4.2;
var printResult = true;
var resultPhrase = "The result is: ";
var result = add(number1, number2, printResult, resultPhrase);
