import React, { useState } from 'react';
import usersData from './users.json'; // Your local user data
import './Profile.css'

function Account({ onLogin, onLogout, isLoggedIn, currentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = () => {
    if (isLogin) {
      // Login logic
      const user = usersData.find(user => user.username === username && user.password === password);
      if (user) {
        onLogin(user); // Call onLogin to set the logged-in user in App.js
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Sign-up logic
      const userExists = usersData.find(user => user.username === username);
      if (userExists) {
        setError('Username already exists');
      } else {
        const newUser = { username, password, likedImages: [], uploadedImages: [] };
        // Simulate saving new user (you'd normally update the file or database here)
        usersData.push(newUser);
        onLogin(newUser); // Set new user as current
        setError('');
      }
      
    }
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from App.js
  };

  return (
    <div className="auth-form">
     {isLoggedIn && currentUser ? (
  <div>
    <h2>Hello, {currentUser.username}!</h2>
    <h3>Your Uploads:</h3>
    <ul>
    {currentUser.uploadedImages.length > 0 ? (
  <div className="uploads-container">
    {currentUser.uploadedImages.map((imageObj, index) => (
      <div className="upload-item" key={index}>
        <img src={imageObj.image} alt={`Uploaded ${index}`} />
        <p>Location: {imageObj.location}</p>
        <p>Recipe Name: {imageObj.recipeName}</p>
        <p>Diets: {imageObj.diets.join(', ')}</p>
        <p>Notes: {imageObj.notes}</p>
      </div>
    ))}
  </div>
) : (
  <p>No uploads yet.</p>
)}
    </ul>
    <button onClick={handleLogout}>Logout</button>
  </div>
) : (
  <div>
    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an Account' : 'Go to Login'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
