import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css'; // Import your CSS file
import logo from './resources/images/Logo.png';
import uploadbtn from './resources/images/uploadbutton.png';
import Accountbtn from './resources/images/accountbutton.png';
import Upload from './Upload'; // Import the Upload component
import Pictures from './Pictures'; // Import the Pictures component
import Recommendation from './Recommendations';
import PlateDate from './PlateDate';

function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false); // State for upload dialog
  const [uploads, setUploads] = useState([]); // State for uploads

  const handleUploadOpen = () => {
    setIsUploadOpen(true); // Open upload dialog
  };

  const handleUploadClose = () => {
    setIsUploadOpen(false); // Close upload dialog
  };

  // Function to handle adding new uploads
  const addUpload = (newImage) => {
    setUploads((prevUploads) => [...prevUploads, newImage]); // Update uploads state
  };

  return (
    <Router> {/* Wrap everything in Router */}
      <div>
        <header>
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Plate Pics Logo" />
            </a>
          </div>
          <nav>
            <ul>
              <li><a href="/pictures">Pictures</a></li>
              <li><a href="/locations">Locations</a></li>
              <li><a href="/recommendations">Recommendations</a></li>
              <li><a href="/platedate">Plate Date</a></li>
            </ul>
            <div className="search-upload">
              <input type="text" placeholder="Search..." />
              <button
                className="upload-btn"
                id="uploadButton"
                onClick={handleUploadOpen} // Open upload dialog
              >
                <img src={uploadbtn} alt="Upload" />
              </button>
            </div>
            <div className="account-btn">
              <button className="account" id="accountButton">
                <img src={Accountbtn} alt="Account" />
              </button>
            </div>
          </nav>
        </header>
        <main>
          {/* Set up routing */}
          <Routes>
            <Route path="/pictures" element={<Pictures uploads={uploads} />} />
            <Route path="/recommendations" element={<Recommendation />} />
            <Route path="/platedate" element={<PlateDate />} /> 
            {/* You can add more routes here */}
            <Route path="/" element={<h1>Welcome to Plate Pics!</h1>} />
          </Routes>

          {/* Render Upload component if the upload dialog is open */}
          {isUploadOpen && <Upload onClose={handleUploadClose} onUpload={addUpload} />}
        </main>
      </div>
    </Router>
  );
}

export default App;
