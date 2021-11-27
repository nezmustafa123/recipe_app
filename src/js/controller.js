import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
// import icons from "../img/icons.svg"; //Parcel 1

import "core-js/stable";
import "regenerator-runtime/runtime";
//console.log(icons); //path to the file

// const recipeContainer = document.querySelector(".recipe");

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

const controlRecipes = async function () {
  //control recipes
  //await promise inside async function
  try {
    const id = window.location.hash.slice(1); //get id from the url bar (hash) from first character
    // console.log(typeof id);

    if (!id) return;
    //render spinner
    recipeView.renderSpinner();

    //1 loading recipe
    //stores
    await model.loadRecipe(id); //have to await it returns a promise so have to await it

    // 2.Rendering recipe
    recipeView.render(model.state.recipe); //add render method that takes indata and stores in boject
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
