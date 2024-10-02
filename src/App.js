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
    setUploads((prevUploads) => [newImage, ...prevUploads]);

    // Update the current user's uploaded images
    if (currentUser) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        uploadedImages: [newImage, ...prevUser.uploadedImages],
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
            <Route path="/locations" element={<Locations uploads={uploads} />} /> {/* Add the Locations route */}
            <Route path="/account" element={<Account onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
            <Route path="/" element={<h1>Welcome to Plate Pics!</h1>} />
          </Routes>

          {isUploadOpen && <Upload onClose={handleUploadClose} onUpload={addUpload} />}
        </main>
      </div>
    </Router>
  );
}

export default App;
