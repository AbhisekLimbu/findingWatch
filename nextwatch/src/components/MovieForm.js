import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    actor: '',
    actress: '',
    genre: '',
    director: '',
    year: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to server
      const response = await axios.post('http://localhost:3002/chatgpt', formData, {
        headers: {
          'Content-Type': 'application/json' // Specify content type
        }
      });
      
      // Log server response
      console.log('Server response:', response.data);

      // Optionally, reset the form after successful submission
      setFormData({
        actor: '',
        actress: '',
        genre: '',
        director: '',
        year: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="actor">Actor:</label>
        <input 
          type="text" 
          id="actor" 
          name="actor" 
          value={formData.actor} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="actress">Actress:</label>
        <input 
          type="text" 
          id="actress" 
          name="actress" 
          value={formData.actress} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input 
          type="text" 
          id="genre" 
          name="genre" 
          value={formData.genre} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <input 
          type="text" 
          id="director" 
          name="director" 
          value={formData.director} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input 
          type="number" 
          id="year" 
          name="year" 
          value={formData.year} 
          onChange={handleChange} 
          required 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
