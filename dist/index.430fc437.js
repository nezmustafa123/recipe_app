const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https:forkify-api.herokuapp.com/v2
///////////////////////////////////////
console.log("Test");
const showRecipe = async function() {
    //await promise inside async function
    try {
        const res = await fetch(//use url to get exact recipe returns a promise
        // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
        `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc990`);
        const data = await res.json(); //returns another promise
        //data from serer, ok property is coming from response istaself
        // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        //invalid id 400
        console.log(res);
        console.log(data);
        //create new object get rid of underscores
        let { recipe  } = data.data; //recipe object destructure it
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (err) {
        //error being caught here
        alert(err);
    }
};
showRecipe();

//# sourceMappingURL=index.430fc437.js.map
