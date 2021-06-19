import _ from "lodash";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Product } from "./product.model";

console.log(_.shuffle([2, 3, 4, 5, 6]));

// This allows TypeScript to access the global variable GLOBAL;
declare const GLOBAL: string;
console.log(GLOBAL);

// No class transformer necessary
const product = new Product("G6", 58000000);
console.log(product.getInformation());

// But sometimes data you might receive from a server will be in JSON and will need to be converted to objects of your class so you can use that class's methods.

const products = [
  { name: "G6", price: 58000000 },
  { name: "Istanbul Turk Ride 22", price: 600 },
];

// const productsList = products.map((prod) => new Product(prod.name, prod.price));
// for (const product of productsList) {
//   console.log(product);
// }

// That's where a package like class-transformer helps out.
const productsList = plainToClass(Product, products);

for (const product of productsList) {
  console.log(product);
}

// class-validator in action
const errorProneProduct = new Product("", -9);
validate(errorProneProduct).then((errors) => {
  if (errors.length > 0) {
    console.log(errors);
  } else {
    console.log(errorProneProduct);
  }
});
