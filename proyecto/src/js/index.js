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
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  response.json().then(printReceipeDetail);
}

//  Imprime el detalle de una receta
function printReceipeDetail(data) {
  const meal = data.meals[0];

  const strMeal = document.getElementById("strMeal");
  const strMealThumb = document.getElementById("strMealThumb");
  const instructions = document.getElementById("instructions");
  const strYoutube = document.getElementById("strYoutube");
  const tags = document.getElementById("tags");
  const carousel = document.getElementById("carousel");

  clearContainers([instructions, recommendRow, tags, carousel]);

  strMeal.innerHTML = meal.strMeal;
  strMealThumb.src = meal.strMealThumb;

  printIngredients(meal);
  carousel.firstChild.className = "carousel-item active";

  meal.strInstructions.split(".").forEach((e) => {
    const li = document.createElement("li");
    li.innerHTML = e;
    instructions.appendChild(li);
  });

  strYoutube.src = meal.strYoutube.replace("watch?v=", "embed/");
  strYoutube.title = meal.strMeal;

  if (meal.strTags != null) {
    tags.innerHTML = "<h2>Tags</h2>";
    meal.strTags.split(",").forEach((e) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-outline-dark";
      button.innerHTML = "#" + e;
      tags.appendChild(button);
    });
  }

  getRecommended(meal.strCategory);
}

function clearContainers(containerList) {
  containerList.forEach((container) => {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  });

  scrollUp();
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function printIngredients(data) {
  const ings = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data["strIngredient" + i];
    const measure = data["strMeasure" + i];
    if (ingredient) {
      const ing = {
        ingredient: ingredient,
        measure: measure,
      };
      ings.push(ing);
    }
  }

  const carouselIndicators = document.querySelector(".carousel-indicators");
  const mDocumentFragment = new DocumentFragment();

  let iterator = 0;
  ings.forEach((e) => {
    const mButton = document.createElement("BUTTON");
    mButton.setAttribute("data-bs-target", "#carouselExampleDark");
    mButton.setAttribute("data-bs-slide-to", iterator);
    if (iterator == 0) {
      mButton.className = "active";
      mButton.setAttribute("aria-current", true);
    }

    mButton.setAttribute("aria-label", `Slide ${iterator + 1}`);
    iterator++;
    mDocumentFragment.appendChild(mButton);
    printIngredient(e);
  });

  carouselIndicators.appendChild(mDocumentFragment);
}

function printIngredient(ing) {
  const carousel = document.getElementById("carousel");

  const carouselItem = document.createElement("div");
  carouselItem.className = "carousel-item";
  carouselItem.setAttribute("data-bs-interval", "3500");

  const img = document.createElement("img");
  img.src = `https://www.themealdb.com/images/ingredients/${ing.ingredient}.png`;
  img.className = "d-block w-100";
  img.alt = ing.ingredient;
  carouselItem.appendChild(img);

  const carouselCaption = document.createElement("div");
  carouselCaption.className = "carousel-caption d-none d-md-block";

  const h5 = document.createElement("h5");
  h5.innerHTML = ing.ingredient;
  carouselCaption.appendChild(h5);

  const p = document.createElement("p");
  p.innerHTML = ing.measure;
  carouselCaption.appendChild(p);

  carouselItem.appendChild(carouselCaption);

  carousel.appendChild(carouselItem);
}

async function getRecommended(area) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${area}`
  );
  const data = await response.json();
  printRecommended(data.meals);
}

function printRecommended(data) {
  const recommendRow = document.getElementById("recommendRow");

  data.forEach((e) => {
    const col = document.createElement("div");
    col.className = "col-sm-4";

    const img = document.createElement("img");
    img.className = "recommended-meal card-img-top";
    img.src = e.strMealThumb;
    img.alt = e.strMeal;
    col.appendChild(img);

    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerHTML = e.strMeal;

    const a = document.createElement("a");
    a.className = "btn btn-dark";
    a.innerText = "Learn more";
    a.addEventListener("click", () => {
      clearContainers([
        recommendRow,
        tags,
        document.querySelector(".carousel-inner"),
        document.querySelector(".carousel-indicators"),
      ]);
      getMeal(e.idMeal);
    });

    cardBody.appendChild(h5);
    cardBody.appendChild(a);

    card.appendChild(cardBody);

    col.appendChild(card);

    recommendRow.appendChild(col);
  });
}

//  Hace una búsqueda con el botón de búsqueda
const makeASearch = (searchButton) => {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchbar = document.querySelector("#txtSearch");
    const queryString = searchbar.value;
    if (queryString.trim() != "") {
      searchByName(queryString);
    } else {
      alert("You need to fill the empty field first!");
    }
  });
};

//  Hace una búsqueda usando telca enter
const makeASearchWithEnter = (searchbar) => {
  searchbar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const queryString = searchbar.value;
      if (queryString.trim() != "") {
        searchByName(queryString);
      } else {
        alert("You need to fill the empty field first!");
      }
    }
  });
};

//  Hace una búsqueda random con el botón rándom
const randomSearch = (randomButton) => {
  randomButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearContainers([
      instructions,
      recommendRow,
      tags,
      document.querySelector(".carousel-inner"),
      document.querySelector(".carousel-indicators"),
    ]);
    getRandomMeal();
  });
};

getMeal(52775);
makeASearchWithEnter(document.querySelector("#txtSearch"));
makeASearch(document.querySelector("#btnSearch"));
randomSearch(document.querySelector("#btnRandom"));
