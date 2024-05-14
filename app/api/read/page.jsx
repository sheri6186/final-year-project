
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://newsapi.org/v2/everything?q=tesla&from=2024-03-30&sortBy=publishedAt&apiKey=fe6a7c0b9bc545cc9c33853a740f6490'; // Update this with your API URL

const ExampleComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-03-30&sortBy=publishedAt&apiKey=fe6a7c0b9bc545cc9c33853a740f6490`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://newsapi.org/v2/everything?q=tesla&from=2024-03-30&sortBy=publishedAt&apiKey=fe6a7c0b9bc545cc9c33853a740f6490`);
      // After deleting, refetch data to update the UI
      fetchData();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {data.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ExampleComponent;
