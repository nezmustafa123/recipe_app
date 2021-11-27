import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
// import icons from "../img/icons.svg"; //Parcel 1
import icons from "url:../img/icons.svg"; //Parcel 2 import icons variable
import "core-js/stable";
import "regenerator-runtime/runtime";
//console.log(icons); //path to the file

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https:forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log("Test");

const renderSpinner = function (parentEl) {
  //attach to any parent element passed in here
  const markup = `
<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
 </div>
`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const controlRecipes = async function () {
  //await promise inside async function
  try {
    const id = window.location.hash.slice(1); //get id from the url bar (hash) from first character
    // console.log(typeof id);

    if (!id) return;
    //render spinner
    renderSpinner(recipeContainer);

    //1 loading recipe
    await model.loadRecipe(id); //have to await it returns a promise so have to await it
    const { recipe } = model.state;
    console.log(recipe);
    // 2.Rendering recipe

    recipeView.render(model.state.recipe); //add render method that takes indata and stores in boject

    const markup = `<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${recipe.ingredients
      .map((ing) => {
        //return string of html inject it in the ingredient list ul
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ing.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
        //transform array of strings into one big string using join
      })
      .join("")}
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  } catch (err) {
    //error being caught here
    alert(err);
  }
};

//run same eventhandler for diffferent events
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
); //loop through and change events
// window.addEventListener("hashchange", controlRecipes);
// //run show recipe function whenever hash changes
// window.addEventListener("load", controlRecipes);
// //event for entire page loading fired off when page loads
