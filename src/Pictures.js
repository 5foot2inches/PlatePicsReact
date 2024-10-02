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
      diets: ["Italian"],
      notes: "Green St. Patrick's day Pizza",
    },
    {
      image: baguetteOven,
      location: 'Malibu Wines and Beer, West Hills, CA',
      recipeName: 'Baguette',
      diets: ['Organic'],
      notes: 'Freshly baked sourdough baguette',
    },
    {
      image: rollingPinDonuts,
      location: 'Rolling Pin, Camarillo, CA',
      recipeName: 'Donut',
      diets: ['Comfort Food'],
      notes: 'Warm glazed donuts with sprinkles',
    },
    {
      image: burgerPics,
      location: 'HomeMade',
      recipeName: 'HomeMade Burger',
      diets: ['Comfort Food', 'American', 'Homemade'],
      notes: 'Juicy homemade burger with all the fixings',
    },
    {
      image: charcuterieBoard,
      location: 'Malibu Wines and Beer, West Hills, CA',
      recipeName: 'Charcuterie Board',
      diets: ['Comfort Food'],
      notes: 'Selection of fine cheeses and meats',
    },
    {
      image: biscuitBomb,
      location: 'Topanga Grain Co, Canoga Park, CA',
      recipeName: 'Loaded Biscuit',
      diets: ['Comfort Food', 'Breakfast', 'American'],
      notes: 'Savory loaded biscuit with toppings',
    },
    {
      image: spanishLemonChicken,
      location: 'HomeMade',
      recipeName: 'Spanish Chicken and Rice with lemon',
      diets: ['European', 'Homemade'],
      notes: 'Delicious lemon-infused Spanish chicken',
    },
    {
      image: breakfast,
      location: 'HomeMade',
      recipeName: 'Eggs with Toast, Turkey Bacon, and sliced Apple',
      diets: ['Comfort Food'],
      notes: 'Classic breakfast with healthy options',
    },
  ];

  const allUploads = [...uploads, ...defaultUploads]; // Combine uploads and default uploads

  // Filter the gallery items based on the search term
  const filteredUploads = allUploads.filter(upload => {
    const searchRegex = new RegExp(searchTerm, 'i'); // Create a regex for case-insensitive matching
    return (
      searchRegex.test(upload.recipeName) ||
      searchRegex.test(upload.location) ||
      upload.diets.some(diet => searchRegex.test(diet)) ||
      searchRegex.test(upload.notes)
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
            <p>Location: {upload.location}</p>
            <p>Recipe: {upload.recipeName}</p>
            <p>Diets: {upload.diets.join(', ')}</p>
            <p>Notes: {upload.notes}</p>
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

            <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, index)}>
              <input type="text" placeholder="Add a comment..." />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pictures;
