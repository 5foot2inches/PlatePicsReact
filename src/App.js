import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import logo from './resources/images/Logo.png';
import uploadbtn from './resources/images/uploadbutton.png';
import Accountbtn from './resources/images/accountbutton.png';
import Upload from './Upload'; // Import the Upload component
import Pictures from './Pictures'; // Import the Pictures component

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
    setUploads([...uploads, newImage]);
  };

  return (
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
        {/* Render Pictures component */}
        <Pictures uploads={uploads} />
        {/* Render Upload component if the upload dialog is open */}
        {isUploadOpen && <Upload onClose={handleUploadClose} onUpload={addUpload} />}
      </main>
    </div>
  );
}

export default App;


