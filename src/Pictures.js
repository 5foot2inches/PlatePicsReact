import React, { useState } from 'react';
import upvote from './resources/images/upvotebutton.png';
import downvote from './resources/images/downvotebutton.png';
import stPatrickPizza from './resources/images/St.PatrickPizza.jpeg';
import baguetteOven from './resources/images/BaguetteOven.jpeg';
import rollingPinDonuts from './resources/images/RollingPinDonuts.jpeg';
import burgerPics from './resources/images/BurgerPics.jpeg';
import charcuterieBoard from './resources/images/CharcuterieBoard.jpeg';
import biscuitBomb from './resources/images/biscuitBomb.jpeg';
import spanishLemonChicken from './resources/images/SpanishlemonChicken.jpeg';
import breakfast from './resources/images/breakfast.jpeg';

function Pictures({ uploads, isLoggedIn, searchTerm }) {
  const [comments, setComments] = useState({});
  const [votes, setVotes] = useState({});
  const [showComments, setShowComments] = useState({});

  const defaultUploads = [
    {
      image: stPatrickPizza,
      location: 'Malibu Wines and Beer, West Hills, CA',
      recipeName: "Pesto Sourdough Pizza",
      diets: ["No Preference"],
      cuisines: ['Italian'], 
      notes: "Green St. Patrick's day Pizza",
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: baguetteOven,
      location: 'Malibu Wines and Beer, West Hills, CA',
      recipeName: 'Baguette',
      diets: ['Organic'],
      cuisines: ['French'], 
      notes: 'Freshly baked sourdough baguette',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: rollingPinDonuts,
      location: 'Rolling Pin, Camarillo, CA',
      recipeName: 'Donut',
      diets: ['Comfort Food'],
      cuisines: ['American'], 
      notes: 'Warm glazed donuts with sprinkles',
      username: '5foot2inches', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: burgerPics,
      location: 'HomeMade',
      recipeName: 'HomeMade Burger',
      diets: ['Comfort Food'],
      cuisines: ['American'], 
      notes: 'Juicy homemade burger with all the fixings',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: charcuterieBoard,
      location: 'Malibu Wines and Beer, West Hills, CA',
      recipeName: 'Charcuterie Board',
      diets: ['Comfort Food'],
      cuisines: ['French'], 
      notes: 'Selection of fine cheeses and meats',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: biscuitBomb,
      location: 'Topanga Grain Co, Canoga Park, CA',
      recipeName: 'Loaded Biscuit',
      diets: ['Comfort Food'],
      cuisines: ['American'], 
      notes: 'Savory loaded biscuit with toppings',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: spanishLemonChicken,
      location: 'HomeMade',
      recipeName: 'Spanish Chicken and Rice with lemon',
      diets: ['No Preference'],
      cuisines: ['Spanish'], 
      notes: 'Delicious lemon-infused Spanish chicken',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
    {
      image: breakfast,
      location: 'HomeMade',
      recipeName: 'Eggs with Toast, Turkey Bacon, and sliced Apple',
      diets: ['Comfort Food'],
      cuisines: ['Breakfast'], 
      notes: 'Classic breakfast with healthy options',
      username: 'admin', // Simulating upload by 'admin'
      userUploaded: true,
    },
  ];

  const allUploads = [...uploads, ...defaultUploads];

  // Filter the gallery items based on the search term
  const filteredUploads = allUploads.filter(upload => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return (
      searchRegex.test(upload.recipeName) ||
      searchRegex.test(upload.location) ||
      upload.diets.some(diet => searchRegex.test(diet)) ||
      searchRegex.test(upload.notes) ||
      upload.cuisines.some(cuisine => searchRegex.test(cuisine)) // Filter by cuisines
    );
  });

  const handleCommentSubmit = (e, index) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to comment.');
      return;
    }
    const commentInput = e.target.querySelector('input[type="text"]');
    const commentText = commentInput.value;
    if (commentText) {
      setComments((prevComments) => ({
        ...prevComments,
        [index]: [...(prevComments[index] || []), commentText],
      }));
      commentInput.value = '';
    }
  };

  const handleVote = (index, type) => {
    if (!isLoggedIn) {
      alert('Please log in to vote.');
      return;
    }
    setVotes((prevVotes) => {
      const currentVotes = prevVotes[index] || { likes: false, dislikes: false };
      if (type === 'like') {
        return {
          ...prevVotes,
          [index]: { likes: !currentVotes.likes, dislikes: false },
        };
      } else if (type === 'dislike') {
        return {
          ...prevVotes,
          [index]: { likes: false, dislikes: !currentVotes.dislikes },
        };
      }
      return prevVotes;
    });
  };

  const toggleComments = (index) => {
    setShowComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="gallery">
      {filteredUploads.map((upload, index) => (
        <div key={index} className="gallery-item">
          <img src={upload.image} alt={upload.recipeName} />
          
          <div className="info">
              <div className="info-header">
                <span className="username"><strong>{upload.username}</strong></span>
              </div>
              

              <p className="recipe-name">{upload.recipeName}</p>
              
              <span className="location">{upload.location}</span>
              
              <p className="notes">
                {upload.notes.length > 100 ? `${upload.notes.substring(0, 100)}...` : upload.notes}
                {upload.notes.length > 100 && <span className="see-more">See More</span>}
              </p>
              <div className="tags">
                <span className="diets"><i className="fa fa-leaf"></i> {upload.diets.join(', ')}</span>
                <span className="cuisines"><i className="fa fa-utensils"></i> {upload.cuisines.join(', ')}</span>
              </div>
          </div>


          <div className="actions">
            <button
              className="like-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleVote(index, 'like');
              }}
            >
              <img src={upvote} alt="Upvote" />
              <span className="like-count">{votes[index]?.likes ? 1 : 0}</span>
            </button>
            <button
              className="dislike-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleVote(index, 'dislike');
              }}
            >
              <img src={downvote} alt="Downvote" />
              <span className="dislike-count">{votes[index]?.dislikes ? 1 : 0}</span>
            </button>
          </div>

          <div className="comment-section">
          <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, index)}>
              <input type="text" placeholder="Add a comment..." />
              <button type="submit">Post</button>
            </form>
            <button onClick={(e) => {
              e.stopPropagation();
              toggleComments(index);
            }}>
              {showComments[index] ? 'Hide Comments' : 'See Comments'}
            </button>

            {showComments[index] && (
              <div className="comments">
                {(comments[index] || []).map((comment, commentIndex) => (
                  <div key={commentIndex} className="comment">{comment}</div>
                ))}
              </div>
            )}

           
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default Pictures;
