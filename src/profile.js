import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsSigningUp(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUploads([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (image) {
      setUploads([...uploads, image]);
      setImage(null);
    }
  };

  return (
    <div className="profile-container">
      {!isLoggedIn ? (
        <div className="login-card">
          {!isSigningUp ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                className="input-field" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button className="btn-primary" type="submit">Login</button>
              <p>
                Don't have an account? 
                <button className="btn-secondary" type="button" onClick={() => setIsSigningUp(true)}> Sign Up</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                className="input-field" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button className="btn-primary" type="submit">Sign Up</button>
              <p>
                Already have an account? 
                <button className="btn-secondary" type="button" onClick={() => setIsSigningUp(false)}> Login</button>
              </p>
            </form>
          )}
        </div>
      ) : (
        <div className="logged-in-view">
          <h2>Welcome, {username}!</h2>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
          
          <div className="upload-section">
            {image && <img src={image} alt="Uploaded" className="preview-image" />}
            <input type="file" className="upload-input" onChange={handleImageChange} />
            <button className="btn-upload" onClick={handleUpload}>Upload</button>
          </div>

          <div className="uploaded-album">
            <h3>Your Uploads</h3>
            <div className="gallery">
              {uploads.length > 0 ? (
                uploads.map((imgSrc, index) => (
                  <img key={index} src={imgSrc} alt={`Upload ${index + 1}`} className="gallery-item" />
                ))
              ) : (
                <p>No uploads yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
