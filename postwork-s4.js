//  Ejercicio 1

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


//  Ejercicio 2

function chunk(array, size) {
  let newArray = [];
  let mini = [];
  for (let i = 0; i < array.length; i++) {
    mini.push(array[i]);
    if ((i + 1) % size == 0 || (i + 1) == array.length) {
      newArray.push(mini);
      mini = [];
    }
  }

  return newArray;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8], 3));

//  Ejercicio 3

function frequency(string) {
  let frecuency = [];
  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    if (frecuency[char]) {
      frecuency[char]++;
    } else {
      frecuency[char] = 1;
    }
  }

  return frecuency;
}

console.log("Test 1:", frequency("cccbbbaaa"));
// {a: 3, b: 3, c: 3}
console.log("Test 2:", frequency("www.bedu.org"));
// {.: 2, b: 1, d: 1, e: 1, g: 1, o: 1, r: 1, u: 1, w: 3}
console.log("Test 3:", frequency("john.doe@domain.com"));
// {.: 2, @: 1, a: 1, c: 1, d: 2, e: 1, h: 1, i: 1, j: 1, m: 2, n: 2, o: 4}
