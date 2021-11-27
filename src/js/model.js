//refactor into architecture
export const state = {
  //will get update by load recipe function
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      //use url to get exact recipe returns a promise
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json(); //returns another promise
    //data from serer, ok property is coming from response istaself
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //invalid id 400
    // console.log(res);
    // console.log(data);
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
    alert(err);
  }
};
