import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './resources/images/Logo.png';
import uploadbtn from './resources/images/uploadbutton.png';
import Accountbtn from './resources/images/accountbutton.png';
import Upload from './Upload';
import Pictures from './Pictures';
import Recommendation from './Recommendations';
import PlateDate from './PlateDate';
import Account from './account'; // Import the Account component
import Locations from './Locations'; // Import the Locations component
import stPatrickPizza from './resources/images/St.PatrickPizza.jpeg';
import baguetteOven from './resources/images/BaguetteOven.jpeg';
import rollingPinDonuts from './resources/images/RollingPinDonuts.jpeg';
import burgerPics from './resources/images/BurgerPics.jpeg';
import charcuterieBoard from './resources/images/CharcuterieBoard.jpeg';
import biscuitBomb from './resources/images/biscuitBomb.jpeg';
import spanishLemonChicken from './resources/images/SpanishlemonChicken.jpeg';
import breakfast from './resources/images/breakfast.jpeg';

const defaultUploads = [
  {
    image: stPatrickPizza,
    location: 'Malibu Wines and Beer, West Hills, CA',
    recipeName: "Pesto Sourdough Pizza",
    diets: ["No Preference"],
    cuisines: ['Italian'], 
    notes: "Green St. Patrick's day Pizza",
    username: 'admin',
    userUploaded: true,
  },
  {
    image: baguetteOven,
    location: 'Malibu Wines and Beer, West Hills, CA',
    recipeName: 'Baguette',
    diets: ['Organic'],
    cuisines: ['French'], 
    notes: 'Freshly baked sourdough baguette',
    username: 'admin',
    userUploaded: true,
  },
  {
    image: rollingPinDonuts,
    location: 'Rolling Pin, Camarillo, CA',
    recipeName: 'Donut',
    diets: ['Comfort Food'],
    cuisines: ['American'], 
    notes: 'Warm glazed donuts with sprinkles',
    username: '5foot2inches',
    userUploaded: true,
  },
  {
    image: burgerPics,
    location: 'HomeMade',
    recipeName: 'HomeMade Burger',
    diets: ['Comfort Food'],
    cuisines: ['American'], 
    notes: 'Juicy homemade burger with all the fixings',
    username: 'admin',
    userUploaded: true,
  },
  {
    image: charcuterieBoard,
    location: 'Malibu Wines and Beer, West Hills, CA',
    recipeName: 'Charcuterie Board',
    diets: ['Comfort Food'],
    cuisines: ['French'], 
    notes: 'Selection of fine cheeses and meats',
    username: 'admin',
    userUploaded: true,
  },
  {
    image: biscuitBomb,
    location: 'Topanga Grain Co, Canoga Park, CA',
    recipeName: 'Loaded Biscuit',
    diets: ['Comfort Food'],
    cuisines: ['American'], 
    notes: 'Savory loaded biscuit with toppings',
    username: 'admin',
    userUploaded: true,
  },
  {
    image: spanishLemonChicken,
    location: 'HomeMade',
    recipeName: 'Spanish Chicken and Rice with lemon',
    diets: ['No Preference'],
    cuisines: ['Spanish'], 
    notes: 'Delicious lemon-infused Spanish chicken',
    username: 'admin',
    userUploaded: true,
  },
  {
    image: breakfast,
    location: 'HomeMade',
    recipeName: 'Eggs with Toast, Turkey Bacon, and sliced Apple',
    diets: ['Comfort Food'],
    cuisines: ['Breakfast'], 
    notes: 'Classic breakfast with healthy options',
    username: 'admin',
    userUploaded: true,
  },
];



function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [currentUser, setCurrentUser] = useState(null); // Track current user
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleUploadOpen = () => {
    if (isLoggedIn) {
      setIsUploadOpen(true);
    } else {
      alert("You must be logged in to upload images."); // Alert for not logged in
    }
  };

  const handleUploadClose = () => setIsUploadOpen(false);

  // Function to handle adding new uploads, pushing them to the front
  const addUpload = (newImage) => {
    setUploads((prevUploads) => [newImage, ...prevUploads]); // Save the new image at the front
  
    // Save uploads to the user if logged in
    if (currentUser) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        uploadedImages: [newImage, ...(prevUser.uploadedImages || [])],
      }));
    }
  };

  // Function to handle user login
  const handleLogin = (user) => {
    setIsLoggedIn(true); // Set login state to true
    setCurrentUser(user); // Set current user
    console.log('Logged in user:', user); // Optional: store user info as needed
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state
    setCurrentUser(null); // Clear current user
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter uploads based on search term, ensuring safety against undefined
  const filteredUploads = uploads.filter((upload) =>
    (upload.name ? upload.name.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div>
        <header>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Plate Pics Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/pictures">Pictures</Link></li>
              <li><Link to="/locations">Locations</Link></li>
              <li><Link to="/recommendations">Recommendations</Link></li>
              <li><Link to="/platedate">Plate Date</Link></li>
            </ul>
            <div className="search-upload">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange} // Update state on input change
              />
              <button
                className="upload-btn"
                id="uploadButton"
                onClick={handleUploadOpen}
                disabled={!isLoggedIn} // Disable the button if not logged in
              >
                <img src={uploadbtn} alt="Upload" />
              </button>
            </div>
            <div className="account-btn">
              <Link to="/account">
                <button className="account" id="accountButton">
                  <img src={Accountbtn} alt="Account" />
                  {isLoggedIn ? 'Account' : 'Login'}
                </button>
              </Link>
            </div>
          </nav>
        </header>
        <main>
        <Routes>
  <Route path="/pictures" element={<Pictures uploads={filteredUploads} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
  <Route path="/recommendations" element={<Recommendation />} />
  <Route path="/platedate" element={<PlateDate />} />
  <Route path="/locations" element={<Locations uploads={uploads} defaultUploads={defaultUploads} />} /> {/* Add the defaultUploads prop */}
  <Route path="/account" element={<Account onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
  <Route path="/" element={<h1>Welcome to Plate Pics!</h1>} />
</Routes>


          {/* Render Upload component when isUploadOpen is true, passing the username */}
          {isUploadOpen && (
            <Upload 
              onClose={handleUploadClose} 
              onUpload={addUpload} 
              username={currentUser?.username} // Pass the logged-in user's username
            />
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
