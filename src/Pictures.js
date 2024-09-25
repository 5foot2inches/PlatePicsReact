
import React, { useState } from 'react';
import upvote from './resources/images/upvotebutton.png';
import downvote from './resources/images/downvotebutton.png';


function Pictures({ uploads }) {
  const [comments, setComments] = useState({}); // State to store comments for each picture
  const [votes, setVotes] = useState({}); // State to track likes/dislikes

  const handleCommentSubmit = (e, index) => {
    e.preventDefault();
    const commentInput = e.target.querySelector('input[type="text"]');
    const commentText = commentInput.value;

    if (commentText) {
      // Add the new comment to the picture's comment list
      setComments((prevComments) => ({
        ...prevComments,
        [index]: [...(prevComments[index] || []), commentText],
      }));
      commentInput.value = ''; // Clear input
    }
  };

  const handleVote = (index, type) => {
    setVotes((prevVotes) => {
      const currentVotes = prevVotes[index] || { likes: false, dislikes: false };

      // Toggle 'like' vote
      if (type === 'like') {
        return {
          ...prevVotes,
          [index]: {
            likes: !currentVotes.likes, // Toggle the like state
            dislikes: false, // Reset dislike if previously disliked
          },
        };
      }

      // Toggle 'dislike' vote
      if (type === 'dislike') {
        return {
          ...prevVotes,
          [index]: {
            likes: false, // Reset like if previously liked
            dislikes: !currentVotes.dislikes, // Toggle the dislike state
          },
        };
      }

      return prevVotes;
    });
  };

  return (
    <div className="gallery">
      {uploads.map((upload, index) => (
        <div key={index} className="gallery-item">
          <img src={upload.image} alt={upload.recipeName} />

          <div className="info">
            <p>Location: {upload.location}</p>
            <p>Recipe: {upload.recipeName}</p>
            <p>Diets: {upload.diets.join(', ')}</p>
            <p>Notes: {upload.notes}</p>
          </div>

          <div className="actions">
            <button className="like-btn" onClick={() => handleVote(index, 'like')}>
              <img src={upvote} alt="Upvote" />
              {/* Show +1 for likes if toggled, otherwise 0 */}
              <span className="like-count">{votes[index]?.likes ? 1 : 0}</span>
            </button>
            <button className="dislike-btn" onClick={() => handleVote(index, 'dislike')}>
              <img src={downvote} alt="Downvote" />
              {/* Show +1 for dislikes if toggled, otherwise 0 */}
              <span className="dislike-count">{votes[index]?.dislikes ? 1 : 0}</span>
            </button>
          </div>

          <div className="comment-section">
            <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, index)}>
              <input type="text" placeholder="Add a comment..." />
              <button type="submit">Post</button>
            </form>

            {/* Render comments */}
            <div className="comments">
              {(comments[index] || []).map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  {comment}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pictures;
