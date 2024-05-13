import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    selectedOption: '',
    inputValue: '' // New state for the input value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/chatgpt', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      setFormData({ selectedOption: '', inputValue: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Function to render input based on selected option
  const renderInput = () => {
    switch (formData.selectedOption) {
      case 'Actor':
      case 'Actress':
      case 'Director':
      case 'Genre':
        return (
          <div>
            <input
              type="text"
              name="inputValue"
              value={formData.inputValue}
              onChange={handleChange}
              placeholder={`Enter ${formData.selectedOption}`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="outer-container" style={{ marginTop: '100px' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <select name="selectedOption" value={formData.selectedOption} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Actor">Actor</option>
            <option value="Actress">Actress</option>
            <option value="Director">Director</option>
            <option value="Genre">Genre</option>
          </select>
        </div>
        {renderInput()} {/* Render input based on selected option */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
