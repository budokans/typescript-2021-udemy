const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

// Crappy type-checking with conditionals
const add = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return +num1 + +num2;
  } else {
    return num1 + num2;
  }
};

button.addEventListener("click", () =>
  console.log(add(input1.value, input2.value))
);
