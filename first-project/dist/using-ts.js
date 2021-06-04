var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
// Crappy type-checking with conditionals
var add = function (num1, num2) { return num1 + num2; };
button.addEventListener("click", function () {
    var sum = add(+input1.value, +input2.value);
    console.log(sum);
});
