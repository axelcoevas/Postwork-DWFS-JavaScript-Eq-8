//  Obtiene de la API por ocurrencia de cadena
async function searchByName(str) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`
  );
  response.json().then(printReceipeCards);
}

//  Imprime las tarjetas de las comidas que se le pasan como data
function printReceipeCards(data) {
  console.log(data);
}

//  Busca la comida por id
async function getMeal(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response.json().then(printReceipeDetail);
}

//  Obtiene una receta de manera random
async function getRandomMeal() {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  response.json().then(printReceipeDetail);
}

//  Imprime el detalle de una receta
function printReceipeDetail(data) {
  const meal = data.meals[0];

  const strMeal = document.getElementById('strMeal');
  const strMealThumb = document.getElementById('strMealThumb');
  const instructions = document.getElementById('instructions');
  const strYoutube = document.getElementById('strYoutube');
  const tags = document.getElementById('tags');

  strMeal.innerHTML = meal.strMeal;
  strMealThumb.src = meal.strMealThumb;

  const ingredients = getIngredients(meal);

  meal.strInstructions.split('.').forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = e;
    instructions.appendChild(li);
  });

  strYoutube.src = meal.strYoutube.replace('watch?v=', 'embed/');
  strYoutube.title = meal.strMeal;

  meal.strTags.split(',').forEach(e => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-dark';
    button.innerHTML = '#' + e;
    tags.appendChild(button);
  });

  getRecommended(meal.strCategory);

  console.log(meal);
}

function getIngredients(data) {
  const ings = [];
  for (let i = 1; i <= 20; i++) {
    if (data['strIngredient' + i] !== null) {
      const ing = {
        "ingredient": data['strIngredient' + i].replaceAll(' ', '_'),
        "measure": data['strMeasure' + i]
      };
      ings.push(ing);
    }
  }
  return ings;
}

async function getRecommended(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${area}`);
  const data = await response.json();
  printRecommended(data.meals);
}

function printRecommended(data) {
  const recommendRow = document.getElementById('recommendRow');

  data.forEach(e => {
    const col = document.createElement('div');
    col.className = 'col-sm-4';

    const img = document.createElement('img');
    img.className = 'recommended-meal card-img-top';
    img.src = e.strMealThumb;
    img.alt = e.strMeal;
    col.appendChild(img);

    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerHTML = e.strMeal;

    const a = document.createElement('a');
    //agregar funcionamiento de onclick
    a.className = 'btn btn-dark';
    a.innerText = 'Learn more';

    cardBody.appendChild(h5);
    cardBody.appendChild(a);

    card.appendChild(cardBody);

    col.appendChild(card);

    recommendRow.appendChild(col);
  });
}

getMeal(52775);
