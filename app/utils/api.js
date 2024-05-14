"use server";
import axios from 'axios';

const API_URL = 'http://localhost:1337/api/articles'; // Change this to your Strapi API URL

export async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}