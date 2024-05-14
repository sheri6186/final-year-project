"use client";
// Import the necessary modules
import { useState } from 'react';
import axios from 'axios';

// Define the component
const MyFormComponent = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [1],
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create an articlearticles
      const response = await axios.post('http://localhost:1337/api/articles', { data: formData });
      console.log('Article created:', response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle error (e.g., show error message)
    }
  };

  // JSX to render the form
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="categories" placeholder="Categories (comma-separated)" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

// Export the component
export default MyFormComponent;
