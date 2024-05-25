"use client";
// Import React, useEffect, useState, and fetchAtrticlesAPI function
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";
import ArticleList from "./../components/article-list";

const EducationPage = () => {
  // Define state variables for data, categories, and loading
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data from the Strapi API
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch category with ID 4 from Strapi API
        const categoryResponse = await fetchAtrticlesAPI("api/categories/2");
        const category = categoryResponse.data;
        console.log("Category:", category);

        // Fetch articles belonging to category ID 4 from Strapi API
        const language = localStorage.getItem("language");
        const articlesResponse = await fetchAtrticlesAPI(
          `api/articles?_locale=${language}&filters[categories][id]=${category.id}&populate=*`
        );
        const articles = articlesResponse.data;
        console.log("Articles:", articles);

        // Set fetched category and articles in state variables
        setCategories(category);
        setData(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Call fetchDataFromApi function when component mounts
    fetchDataFromApi();
  }, []);

  return <ArticleList loading={loading} data={data} />;
};

export default EducationPage;
