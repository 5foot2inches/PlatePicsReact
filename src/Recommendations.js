import React, { useState, useEffect } from 'react';

function Recommendation() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subreddit, setSubreddit] = useState("FoodPorn"); // Default subreddit

  const subreddits = {
    Vegan: "veganrecipes",
    Keto: "ketorecipes",
    Vegetarian: "vegetarian",
    Glutenfree: "glutenfree",
    Organic: "organic",
    Food: "food",
    Recipes: "recipes",
    FoodPorn: "FoodPorn",
  };

  // Fetch Reddit posts from the selected subreddit
  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((data) => {
        const foodPosts = data.data.children.map((child) => child.data);
        setPosts(foodPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [subreddit]); // Refetch whenever subreddit changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <div className="recommendation-header">
  <h1>Find some recipes Reddit Inspired:</h1>

  <select
    className="subreddit-dropdown"
    value={subreddit}
    onChange={(e) => setSubreddit(e.target.value)}
  >
    {Object.entries(subreddits).map(([label, value]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
</div>

      {/* Render posts */}
      <div className="gallery">
        {posts.map((post) => (
          <div key={post.id} className="gallery-item">
            {/* Display the image */}
            {post.preview && post.preview.images && post.preview.images[0] ? (
              <img
                src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
                alt={post.title}
                style={{ maxWidth: '300px' }}
              />
            ) : (
              <p>No image available</p>
            )}

            {/* Display the post title */}
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendation;