"use strict";
const button = document.querySelector("button");
function add(n1, n2) {
    if (n1 > 5) {
        return n1 + n2;
    }
    return;
}
function clickHandler(message) {
    console.log("Clicked! " + message);
}
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "This is the message"));
}
