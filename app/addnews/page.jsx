"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyFormComponent = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: '',
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      title: formData.title,
      description: formData.description,
      categories: [formData.categories],
    }));
    if (formData.image) {
      formDataToSend.append('files.image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:1337/api/articles', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Article created:', response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="categories"
        onChange={handleChange}
        value={formData.categories}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.attributes.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default MyFormComponent;
