// lib/Script-Client.js

import axios from "axios";

const API_URL = "http://localhost:1337/"; // Update this with your Strapi API URL

const fetchAtrticlesAPI = async (path) => {
  try {
    const response = await axios.get(`${API_URL}${path}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from Strapi API");
  }
};

export { fetchAtrticlesAPI };
