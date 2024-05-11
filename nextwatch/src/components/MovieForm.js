import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    actor: '',
    actress: '', 
    genre: '',
    director: '',
    year: ''
  });

  const handleChange = (e) => {
     const { name, value } = e.target;
    setFormData(prevState => ({
      xprevState,
      [name]: value
    }));
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
    <div className="outer-container" style={{ marginTop: '100px' }}>
      <div className="container">
        <div className="card shadow" style={{ padding: '30px' }}>
          <h1 className="c`ard-title text-center mb-4">Your Next Watch</h1>
          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
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
              <label htmlFor="year" className="form-label">Year:</label>f v
              <input 
                type="number" 
                id="year" 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <div className="d-grid gap-5">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
    </div>
    </div>
  
  );
};

export default ContactForm;
