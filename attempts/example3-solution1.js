/*Reto 3*/

/*
Escribir una función frequency que recibe un string como argumento.
Esta función debe contar la frecuencia o el número de veces que se
repite cada carácter. El resultado debe mostrarse en un objeto donde
las propiedades sean los caracteres, y los valores sean la frecuencia.
Los resultados deben ordenarse ascendentemente por los caracteres y no
la frecuencia.
*/

function frequency(str) {
  const strArray = str.split("").sort();
  let aux = -1;
  let finalObj = {};
  for (let i = 0; i < strArray.length; i++) {
    aux++;
    finalObj =
      aux == 0 || strArray[aux] != strArray[aux - 1]
        ? { ...finalObj, [strArray[aux]]: 1 }
        : {
          ...finalObj,
          [strArray[aux - 1]]: finalObj[`${strArray[aux - 1]}`] + 1,
        };
  }
  return finalObj;
}

console.log("Test 1:", frequency("cccbbbaaa"));
// {a: 3, b: 3, c: 3}
console.log("Test 2:", frequency("www.bedu.org"));
// {.: 2, b: 1, d: 1, e: 1, g: 1, o: 1, r: 1, u: 1, w: 3}
console.log("Test 3:", frequency("john.doe@domain.com"));
// {.: 2, @: 1, a: 1, c: 1, d: 2, e: 1, h: 1, i: 1, j: 1, m: 2, n: 2, o: 4}


//Solución de Axel

function frecuency2(string) {
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



// Solución Eleazar
 function frequency3(string) {

    let caracter = [];
    let resultado = [];

    //Obtener todos los caracteres
    for(var i = 0; i < string.length; i++){
        caracter.push(string[i])
    }

    //Eliminar duplicados
    let caracteres = caracter.filter((item,index)=>{
        return caracter.indexOf(item) === index;
      })

    caracteres.sort();
    
    cuenta = 0;

    for(var i=0; i < caracteres.length; i++){
    posicion = string.indexOf(caracteres[i]);
    while ( posicion != -1 ) {
            cuenta++;
            posicion = string. indexOf(caracteres[i],posicion+1);
        }
    var letra = caracteres[i];
    resultado[letra] = cuenta;
    cuenta = 0;
    }
    return resultado
}
