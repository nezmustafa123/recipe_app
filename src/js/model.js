import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
//refactor into architecture
export const state = {
  //will get update by load recipe function
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`); //resolved value will be data and stored into data

    //create new object get rid of underscores
    const { recipe } = data.data; //recipe object destructure it
    state.recipe = {
      //update state object and manipulate directly
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    //Temp error handling error comes from getjson consequence of first error
    console.error(`${err} xxxx`);
    throw err; //have to rethrow the error maually to enter catchblock in control recipes
  }
};
