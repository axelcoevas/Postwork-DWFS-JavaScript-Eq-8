//  Obtiene de la API por ocurrencia de cadena
async function searchByName(str) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`);
  response.json().then(printReceipeCards);
}

//  Imprime las tarjetas de las comidas que se le pasan como data
function printReceipeCards(data) {
  console.log(data);
}

//  Busca la comida por id
async function getMeal(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?s=${id}`);
  response.json().then(printReceipeDetail);
}

//  Obtiene una receta de manera random
async function getRandomMeal() {
  const response = await fetch(`www.themealdb.com/api/json/v1/1/random.php`);
  response.json().then(printReceipeDetail);
}

//  Imprime el detalle de una receta
function printReceipeDetail(data) {
  console.log(data);
}
