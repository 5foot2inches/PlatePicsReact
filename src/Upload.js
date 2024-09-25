import React, { useState } from 'react';
import './upload.css';

function Upload({ onClose, onUpload }) {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [diets, setDiets] = useState([]);
  const [notes, setNotes] = useState('');

  const dietOptions = [
    'No Preference', 'Vegan', 'Vegetarian', 'Pescatarian',
    'Carnivore', 'Gluten-Free', 'Keto', 'Comfort Food',
    'Healthy', 'Organic',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUpload = {
      image,
      location,
      recipeName,
      diets,
      notes,
    };
    onUpload(newUpload);  // Send image data to App.js
    onClose();  // Close the upload form
  };

  return (
    <div className="upload-container">
      <h2>Upload Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded Preview" />
          </div>
        )}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name of Recipe"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
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
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Upload</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Upload;


