import React, { useState } from 'react';
import './upload.css';
import platepic from './resources/images/platepic.png';

function Upload({ onClose, onUpload, username }) { // Accept username as a prop
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [diets, setDiets] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [notes, setNotes] = useState('');
  const [isHomemade, setIsHomemade] = useState(false);

  const dietOptions = [
    'No Preference', 'Vegan', 'Vegetarian', 'Pescatarian',
    'Carnivore', 'Gluten-Free', 'Keto', 'Comfort Food',
    'Healthy', 'Organic',
  ];

  const cuisineOptions = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'American',
    'French', 'Japanese', 'Mediterranean', 'Thai', 
    'Spanish', 'Greek', 'Korean', 'Vietnamese', 
    'Brazilian', 'Middle Eastern', 'Breakfast', 'Dessert'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDietChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDiets([...diets, value]);
    } else {
      setDiets(diets.filter((diet) => diet !== value));
    }
  };

  const handleCuisineChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCuisines([...cuisines, value]);
    } else {
      setCuisines(cuisines.filter((cuisine) => cuisine !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUpload = {
      image,
      location: isHomemade ? "Homemade" : location,
      recipeName,
      diets,
      cuisines,
      notes,
      username, // Automatically include the username
      userUploaded: true, // Ensure to set this flag for new uploads
    };
    onUpload(newUpload);
    onClose();
  };

  return (
    <div className="upload-container">
      <h2>Upload Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="file-upload-label">
          <span className="round-button">
            <img src={platepic} alt="PlatePic" style={{ width: '95px', height: '95px', borderRadius: '50%' }} />
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={{ display: 'none' }}
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded Preview" />
          </div>
        )}
        <div className="location-container">
          <input
            type="text"
            placeholder="Location"
            value={isHomemade ? "" : location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isHomemade}
          />
          <label>
            <input
              type="checkbox"
              checked={isHomemade}
              onChange={() => setIsHomemade(!isHomemade)}
            />
            Homemade
          </label>
        </div>
        <input
          type="text"
          placeholder="Name of Recipe"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
        <div className="diet-cuisine-container">
          <div>
            <h4>Diets</h4>
            {dietOptions.map((diet) => (
              <div key={diet} className="checkbox-label">
                <input
                  type="checkbox"
                  value={diet}
                  onChange={handleDietChange}
                />
                <label>{diet}</label>
              </div>
            ))}
          </div>
          <div>
            <h4>Cuisines</h4>
            {cuisineOptions.map((cuisine) => (
              <div key={cuisine} className="checkbox-label">
                <input
                  type="checkbox"
                  value={cuisine}
                  onChange={handleCuisineChange}
                />
                <label>{cuisine}</label>
              </div>
            ))}
          </div>
        </div>
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Upload</button>
        <button type="button" onClick={onClose} style={{ marginTop: '5px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default Upload;
