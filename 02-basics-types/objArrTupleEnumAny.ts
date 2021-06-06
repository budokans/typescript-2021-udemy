//********* Objects *********/

// While you can explicitly assign a specific object type to objects assigned to variables, it's TypeScript's type inference makes this redundant.

// const me: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Steven",
//   age: 32,
//   hobbies: ["Coding", "Drums"],
//   role: [2, "author"],
// };

//********* Arrays *********//

for (const hobby of me.hobbies) {
  console.log(hobby.toUpperCase()); // No error
  // console.log(hobby.filter())    // Error - property 'filter' doesn't exist on type string
}

//********* Tuples *********//

// me.role.push("admin"); // Actually works - TypeScript doesn't pick up this error
// me.role[1] = 10;       // Error - type 'number' is not assignable to type 'string'.
// me.role = [0, 'admin', 'user']; // Error source has three elements but target only allows two.

//********* Enums *********//

// For key value pairs, you can declare them in global constants like so. But what if you only want to declare a fixed number of constants? That's where enums come in.
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// Note: you can initialise a value with a particular number if you like. The values that follow will be assigned consecutive integers relative to that number, unless otherwise specified.
enum Role {
  ADMIN = 1,
  READ_ONLY,
  AUTHOR,
}

const me = {
  name: "Steven",
  age: 32,
  hobbies: ["Coding", "Drums"],
  // role: ADMIN,
  role: Role.ADMIN,
};

//********* Any  *********/

// suck don't use it.
