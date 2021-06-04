const button: HTMLButtonElement = document.querySelector("button");
const input1 = document.getElementById("num1") as HTMLInputElement;
const input2 = document.getElementById("num2") as HTMLInputElement;

// Crappy type-checking with conditionals
const add = (num1: number, num2: number): number => num1 + num2;

button.addEventListener("click", () => {
  const sum = add(+input1.value, +input2.value);
  console.log(sum);
});
