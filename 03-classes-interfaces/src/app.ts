const button = document.querySelector("button");

// This comment will be removed on compilation.

function add(n1: number, n2: number) {
  if (n1 > 5) {
    return n1 + n2;
  }
  return;
  // noImplicitReturns: true in tsconfig causes tsc to throw a compliation error if the above return statement isn't present.
}

function clickHandler(message: string) {
  console.log("Clicked! " + message);
  // let username = "Max"; // noUnusedLocals: true in tsconfig causes tsc to throw a compliation error.
}

if (button) {
  button.addEventListener(
    "click",
    clickHandler.bind(null, "This is the message")
  );
}
