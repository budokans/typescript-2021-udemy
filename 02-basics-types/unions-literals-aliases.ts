//************ Unions, literal types and type aliases ************/

type Combinable = number | string;
type ConversionResultant = "as-number" | "as-string";

const combine = (
  input1: Combinable,
  input2: Combinable,
  resultType: ConversionResultant
) => {
  let result: number | string;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultType === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
};

const combinedAges = combine(23, 35, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("23", "35", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Steven", "Webster", "as-string");
console.log(combinedNames);
