import React, { useState } from 'react';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic for signing up (mocked here)
    if (username && password) {
      setIsSigningUp(false);
      // Optionally: Clear the fields
      setUsername('');
      setPassword('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for validating the login (mocked here)
    if (username && password) {
      setIsLoggedIn(true);
      // Optionally: Clear the fields
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUploads([]); // Clear uploads on logout if needed
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
      setImage(null); // Clear the image after upload
    }
  };

  return (
    <div className="profile">
      {!isLoggedIn ? (
        <>
          {!isSigningUp ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="submit">Login</button>
              <p>
                Don't have an account? 
                <button type="button" onClick={() => setIsSigningUp(true)}> Sign Up</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="submit">Sign Up</button>
              <p>
                Already have an account? 
                <button type="button" onClick={() => setIsSigningUp(false)}> Login</button>
              </p>
            </form>
          )}
        </>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <div className="upload-section">
            {image && <img src={image} alt="Uploaded" style={{ width: '200px' }} />}
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>
          <div className="uploaded-album">
            <h3>Your Uploads</h3>
            {uploads.length > 0 ? (
              uploads.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`Upload ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
              ))
            ) : (
              <p>No uploads yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;