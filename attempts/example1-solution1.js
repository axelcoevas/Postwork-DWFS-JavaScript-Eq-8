/*
RETO 1: (No tiene recursión)

Escribir una función llamada deepEqual que reciba dos argumentos y 
retorne true si son el mismo valor o si son objetos con las mismas propiedades, 
en este último caso los valores de las propiedades deben ser comparados con una 
llamada recursiva de deepEqual.
*/

var john = {
  firstName: "John",
  lastName: "Doe",
};

function deepEqual(a, b) {
  if (typeof a == "object" && typeof b == "object") {
    let aux = 0;
    const objectToEvaluate =
      Object.keys(a).length > Object.keys(b).length ? a : b;
    for (item of Object.keys(objectToEvaluate)) {
      const { [item]: property1 } = a;
      const { [item]: property2 } = b;
      if (property1 != property2) aux++;
    }
    return aux == 0;
  } else return a === b;
}

console.log("Test 1:", deepEqual(1, 1)); // true
console.log("Test 2:", deepEqual(1, "1")); // false
console.log("Test 3:", deepEqual(john, john)); // true
console.log("Test 4:", deepEqual(john, { firstName: "John", lastName: "Doe" })); // true
console.log("Test 5:", deepEqual(john, { firstName: "John" })); // false
