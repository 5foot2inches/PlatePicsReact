import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Location({ uploads = [], defaultUploads = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'APIKEYHERE', // Replace with your API key
    libraries: ['places'],
  });

  const fetchRestaurants = useCallback((location) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    let keyword = searchTerm;

    // Include cuisine and diet in the search keyword if provided
    if (cuisine) {
      keyword += ` ${cuisine}`;
    }
    if (diet) {
      keyword += ` ${diet}`;
    }

    const request = {
      location,
      radius: '5000',
      type: ['restaurant'],
      keyword,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setRestaurants(results);
      }
    });
  }, [searchTerm, cuisine, diet]);

  const onSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchTerm }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        fetchRestaurants(location);
      }
    });
  };

  // Filtering uploads based on location, cuisine, and diet
  const filteredUploads = uploads.filter(upload => {
    const matchesLocation = upload.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisine ? upload.cuisines.includes(cuisine) : true;
    const matchesDiet = diet ? upload.diets.includes(diet) : true;

    console.log("Checking upload:", upload);
    console.log("Matches Location:", matchesLocation, "| Matches Cuisine:", matchesCuisine, "| Matches Diet:", matchesDiet);

    return matchesLocation && matchesCuisine && matchesDiet;
  });

  // If no uploads match the criteria, fallback to default uploads
  const uploadsToDisplay = filteredUploads.length > 0 ? filteredUploads : defaultUploads;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 class ='findRest'>Find Restaurants:</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location (e.g., Camarillo)"
        />
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter cuisine (optional)"
        />
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          placeholder="Enter diet (optional)"
        />
        <button class ='search-btn' onClick={onSearch}>Search</button>
      </div>

      {/* Display map */}
      <GoogleMap
        center={{ lat: 34.2164, lng: -119.0376 }} // Default center
        zoom={10}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            position={restaurant.geometry.location}
            title={restaurant.name}
          />
        ))}
      </GoogleMap>

      {/* Show restaurants in gallery style */}
      <div className="gallery-container">
        <h2 class ='restSearch'>Restaurants Based On Your Search:</h2>
        <div className="gallery">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="gallery-item">
              <div className="gallery-item-content">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.vicinity}</p>
                {restaurant.photos && (
                  <img
                    src={restaurant.photos[0].getUrl({ maxWidth: 300 })}
                    alt={restaurant.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show uploads based on search criteria or fallback to default uploads */}
      <div className="gallery-container">
        <h2 class='uploadCriteria'>User Uploads with Same Criteria:</h2>
        <div className="gallery">
          {uploadsToDisplay.map((upload, index) => (
            <div key={index} className="gallery-item">
              <img src={upload.image} alt={upload.recipeName} />
              <p>{upload.recipeName} - {upload.diets.join(', ')}</p>
              <p>Location: {upload.location}</p>
              <p>Notes: {upload.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Location;
