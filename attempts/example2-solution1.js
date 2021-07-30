/*
RETO 2

Escribir una función chunk que recibe 
un arreglo y un número entero size. 
La función debe dividir el arreglo en múltiples 
arreglos del tamaño determinado por size.
*/

function chunk(array, size) {
  let finalArray = [];
  let aux = -1;
  for (let i = 0; i < array.length / size; i++) {
    let tempArray = [];
    for (let j = 0; j < array.length; j++) {
      aux++;
      if (array[aux] != undefined)
        tempArray.push(aux == 0 ? array[j] : array[aux]);
      if (j == size - 1) {
        finalArray.push(tempArray.flat());
        break;
      }
    }
  }
  return finalArray;
}

var data = [1, 2, 3, 4, 5, 6, 7, 8];

console.log("Test 1:", chunk(data, 1)); // [[1], [2], [3], [4], [5], [6], [7], [8]]
console.log("Test 2:", chunk(data, 2)); // [[1, 2], [3, 4], [5, 6], [7, 8]]
console.log("Test 3:", chunk(data, 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]
