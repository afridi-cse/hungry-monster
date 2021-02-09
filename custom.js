const searchMeal = async() => {
    const searchText = document.getElementById('searchInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (searchText.indexOf(' ') >= 0) {
            displayError("Please write a name of Meal. Not Space !!!");
            document.getElementById("mealsContainer").innerHTML = ``;
            document.getElementById("displayIngredients").innerHTML = ``;
        } else if (searchText.length == 0) {
            displayError("You don't write anything. Please enter a name of Meal, Which you want.");
            document.getElementById("mealsContainer").innerHTML = ``;
            document.getElementById("displayIngredients").innerHTML = ``;
        } else {
            displayMeals(data.meals);
            displayError("");
            document.getElementById("displayIngredients").innerHTML = ``;
        }
    } catch (error) {
        displayError("Your searched food is not available in our cart. Please Try Again !!!");
    }
}

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById("mealsContainer");
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'mealDiv col';
        mealDiv.innerHTML = `      
          <div onclick="displayIngredients('${meal.idMeal}')" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              </div>           
          </div>
        `;
        mealsContainer.appendChild(mealDiv);
    });
}
const displayIngredients = async(id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url);
    const data = await res.json();
    ingredientsInfo(data.meals[0]);
}


// const displayIngredients = (id) => {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => ingredientsInfo(data.meals[0]));
// }

const ingredientsInfo = meals => {
    const ingredientsDiv = document.getElementById("displayIngredients");
    ingredientsDiv.innerHTML = `
    <div class="card bg-warning" style="width: 18rem;">
    <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title fw-bold">${meals.strMeal}</h5>
      <p class="card-text fw-bold">Ingredients</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${meals.strIngredient1}</li>
      <li class="list-group-item">${meals.strIngredient2}</li>
      <li class="list-group-item">${meals.strIngredient3}</li>
      <li class="list-group-item">${meals.strIngredient4}</li>
      <li class="list-group-item">${meals.strIngredient5}</li>
      <li class="list-group-item">${meals.strIngredient6}</li>
      <li class="list-group-item">${meals.strIngredient7}</li>
      <li class="list-group-item">${meals.strIngredient8}</li>
      <li class="list-group-item">${meals.strIngredient9}</li>
      <li class="list-group-item">${meals.strIngredient10}</li>
    </ul>
  </div>   
    `;


}
const displayError = (error) => {
    console.log("error");
    const errorText = document.getElementById('error-messege');

    errorText.innerHTML = `
    <h1>${error}</h1>

   `;
}