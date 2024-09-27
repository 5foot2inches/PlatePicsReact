import React, { useState } from 'react';

const PlateDate = () => {
  const [cuisine, setCuisine] = useState('');
  const [flavor, setFlavor] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    'Pescetarian'
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
      const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${diet}&number=10&apiKey=00df4f5f23504f8f86104a11400d1f93&includeIngredients=${selectedIngredient}`;
      
      console.log('Fetching URL:', url); // Log the URL for debugging
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        if (data.results) {
          setRecipes(data.results);
        } else {
          setRecipes([]);
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
    <div>
      <h1>Find Your Perfect Plate!</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Matching...' : 'Match My Plate!'}
        </button>
      </form>

      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error Message */}
        {recipes.length > 0 ? (
          <div>
            <h2>Recipes:</h2>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '200px' }} />
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






