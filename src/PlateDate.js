import React, { useState } from 'react';

const PlateDate = () => {
  const [cuisine, setCuisine] = useState('');
  const [flavor, setFlavor] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cost, setCost] = useState(false);
  const [proteinRich, setProteinRich] = useState(false);

  const cuisines = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'American', 
    'French', 'Japanese', 'Mediterranean', 'Thai', 'Spanish',
    'Greek', 'Korean', 'Vietnamese', 'Brazilian', 'Middle Eastern', 
    'Breakfast', 'Dessert'
  ];

  const diets = [
    'No Restrictions', 'Vegetarian', 'Vegan', 'Paleo', 'Ketogenic', 
    'Gluten Free', 'Dairy Free', 'Pescetarian', 'Nut Free', 'Healthy'
  ];

  const flavorIngredients = {
    Sweet: 'sugar', Savory: 'salt', Spicy: 'chili pepper', 
    Umami: 'mushroom', Salty: 'salt'
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const selectedIngredient = flavor ? flavorIngredients[flavor] : '';
      const proteinFilter = proteinRich ? '&minProtein=30' : '';

      const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${diet}&number=10&apiKey=APIKEYHERE&includeIngredients=${selectedIngredient}${proteinFilter}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const fetchedRecipes = data.results || [];

        if (cost) {
          const affordableRecipes = await Promise.all(fetchedRecipes.map(async (recipe) => {
            const detailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=APIKEYHERE&includeNutrition=true`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            const totalCost = detailsData.pricePerServing * detailsData.servings / 100;
            return totalCost <= 20 ? { ...recipe, pricePerServing: detailsData.pricePerServing, servings: detailsData.servings } : null;
          }));
          setRecipes(affordableRecipes.filter(recipe => recipe !== null));
        } else {
          setRecipes(fetchedRecipes);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch recipes');
      }
    } catch (error) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="plate-date-container">
      <h1>Find Your Perfect Plate!</h1>
      <form className="plate-date-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cuisine:
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="">Select a Cuisine</option>
              {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>Flavor:
            <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
              <option value="">Select a Flavor</option>
              {Object.keys(flavorIngredients).map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>Diet:
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="">Select a Diet</option>
              {diets.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked={cost} onChange={() => setCost(!cost)} />
            Affordable Option (under $20)
          </label>
          <label>
            <input type="checkbox" checked={proteinRich} onChange={() => setProteinRich(!proteinRich)} />
            Protein-Rich Option
          </label>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Matching...' : 'Match My Plate!'}
        </button>
      </form>
      <div>
  {error && <p className="error-message">{error}</p>}
  {recipes.length > 0 ? (
    <div className="recipe-container">
      <h2>Recipes:</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    !loading && <p>No recipes found. Try different selections!</p>
  )}
</div>

    </div>
  );
};

export default PlateDate;
