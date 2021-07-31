/*RETO 2*/

/*Escribir una función chunk que recibe
un arreglo y un número entero size.
La función debe dividir el arreglo en múltiples
arreglos del tamaño determinado por size.*/

function chunk(array, size) {
  let finalArray = [];
  let aux = -1;
  for (let i = 0; i < array.length / size; i++) {
    let tempArray = [];
    for (let j = 0; j < array.length; j++) {
      aux++;
      if (array[aux] != undefined) tempArray.push(array[aux]);
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


//Solución Axel

function chunk2(array, size) {
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

console.log(chunk2([1, 2, 3, 4, 5, 6, 7, 8], 3));



// Solución Eleazar Cabrera
function chunk3(array, size) {
     let resultado = [];
     let parcial = [];
     let index = 0
  if(size<array.length){
    let particiones = Math.trunc(array.length/size);
    let ultimaparticion = array.length%size;
        for(var i = 0; i<particiones; i++){
            for(var j = 0; j<size; j++){
                parcial.push(array[index])
                index++
            }
            resultado.push(parcial)
            parcial = [];
        }
        if(ultimaparticion==0){
            return resultado
        }else {
        // Última partición - tamaño parcial
            for(var j = index; j<array.length;j++){
                parcial.push(array[index])
                index++
            }
            resultado.push(parcial)
            return resultado
        }    
  }else{
    console.log("Elige menos particiones")
  }
}

onsole.log("Test 1:", chunk3(data, 1)); 
console.log("Test 2:", chunk3(data, 2)); 
console.log("Test 3:", chunk3(data, 3)); 
