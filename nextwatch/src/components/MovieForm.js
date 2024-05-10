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
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Your Next Watch</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="actor" className="form-label">Actor:</label>
              <input 
                type="text" 
                id="actor" 
                name="actor" 
                value={formData.actor} 
                onChange={handleChange} 
                className="form-control" 
               
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="actress" className="form-label">Actress:</label>
              <input 
                type="text" 
                id="actress" 
                name="actress" 
                value={formData.actress} 
                onChange={handleChange} 
                className="form-control" 
               
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">Genre:</label>
              <input 
                type="text" 
                id="genre" 
                name="genre" 
                value={formData.genre} 
                onChange={handleChange} 
                className="form-control" 
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="director" className="form-label">Director:</label>
              <input 
                type="text" 
                id="director" 
                name="director" 
                value={formData.director} 
                onChange={handleChange} 
                className="form-control" 
               
              />
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year:</label>
              <input 
                type="number" 
                id="year" 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                className="form-control" 
                
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
