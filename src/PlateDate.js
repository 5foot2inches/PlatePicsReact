import React, { useState } from 'react';

const PlateDate = () => {
  const [cuisine, setCuisine] = useState('');
  const [flavor, setFlavor] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cost, setCost] = useState(false);
  const [proteinRich, setProteinRich] = useState(false); // New protein-rich state

  const cuisines = [
    'Italian', 
    'Mexican', 
    'Chinese', 
    'Indian', 
    'American', 
    'French', 
    'Japanese', 
    'Mediterranean', 
    'Thai', 
    'Spanish',
    'Greek', 
    'Korean',
    'Vietnamese',
    'Brazilian'
  ];

  const diets = [
    'No Restrictions',
    'Vegetarian',
    'Vegan',
    'Paleo',
    'Ketogenic',
    'Gluten Free',
    'Dairy Free',
    'Pescetarian', 
    'Nut Free', 
    'Healthy'
  ];

  const flavorIngredients = {
    Sweet: 'sugar',
    Savory: 'salt',
    Spicy: 'chili pepper',
    Umami: 'mushroom',
    Salty: 'salt',
  };


  const fetchRecipes = async () => {
    setLoading(true);
    setError('');

    try {
        const selectedIngredient = flavor ? flavorIngredients[flavor] : '';
        const proteinFilter = proteinRich ? '&minProtein=30' : ''; // Protein-rich filter
        
        // First fetch a list of recipes
        const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${diet}&number=10&apiKey=APIKEYHERE!&includeIngredients=${selectedIngredient}${proteinFilter}`;
        console.log('Fetching URL:', url);
        const response = await fetch(url);
        const data = await response.json();
  
        if (response.ok) {
          const fetchedRecipes = data.results || [];
  
          if (cost) {
            // If cost filter is selected, fetch price breakdown for each recipe
            const affordableRecipes = await Promise.all(fetchedRecipes.map(async (recipe) => {
              const detailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=APIKEY HERE&includeNutrition=true`;
              const detailsResponse = await fetch(detailsUrl);
              const detailsData = await detailsResponse.json();
  
              // Calculate the total cost (price per serving * servings)
              const totalCost = detailsData.pricePerServing * detailsData.servings / 100; // Divide by 100 to convert to dollars
              return totalCost <= 20 ? { ...recipe, pricePerServing: detailsData.pricePerServing, servings: detailsData.servings } : null;
            }));
  
            // Filter out null values and set affordable recipes
            setRecipes(affordableRecipes.filter(recipe => recipe !== null));
          } else {
            // No cost filter, set recipes directly
            setRecipes(fetchedRecipes);
          }
        } else {
          throw new Error(data.message || 'Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again.');
        setRecipes([]);
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
        <label>
          Cuisine:
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">Select a Cuisine</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </label>
        <label>
          Flavor:
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
            <option value="">Select a Flavor</option>
            {Object.keys(flavorIngredients).map((flavorOption) => (
              <option key={flavorOption} value={flavorOption}>{flavorOption}</option>
            ))}
          </select>
        </label>
        <label>
          Diet:
          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">Select a Diet</option>
            {diets.map((dietOption) => (
              <option key={dietOption} value={dietOption}>{dietOption}</option>
            ))}
          </select>
        </label>
        
        {/* Affordable Option */}
        <label style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={cost}
            onChange={() => setCost(!cost)}
            style={{ marginRight: '5px' }}
          />
          <strong>Affordable Option (under $20)</strong>
        </label>

    
        {/* Protein-Rich Option */}
        <label style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={proteinRich}
            onChange={() => setProteinRich(!proteinRich)}
            style={{ marginRight: '5px' }}
          />
          <strong>Protein-Rich Option</strong>
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Matching...' : 'Match My Plate!'}
        </button>
      </form>

      <div>
        {error && <p className="error-message">{error}</p>} {/* Error Message */}
        {recipes.length > 0 ? (
          <div>
            <h2>Recipes:</h2>
            <ul className="recipe-list">
              {recipes.map((recipe) => (
                <li className="recipe-item" key={recipe.id}>
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
