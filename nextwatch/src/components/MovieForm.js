import React, { useState } from 'react';

const MovieForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      onSubmit(query);
      setQuery(''); // Clear input after submission
    }
  };

  return (
    <div className="movie-form-container">
      <h2>Find Movie Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="movie-query">Enter Movie Title:</label>
          <input
            id="movie-query"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="E.g., The Shawshank Redemption"
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MovieForm;
