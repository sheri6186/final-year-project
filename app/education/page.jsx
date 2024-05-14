"use client";
// Import React, useEffect, useState, and fetchAtrticlesAPI function
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";

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
        const categoryResponse = await fetchAtrticlesAPI("api/categories/4");
        const category = categoryResponse.data;
        console.log("Category:", category);

        // Fetch articles belonging to category ID 4 from Strapi API
        const articlesResponse = await fetchAtrticlesAPI(
          `api/articles?filters[categories][id]=${category.id}&populate=*`
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

  return (
    <>
    <h1 className="font-bold text-2xl px-2 mt-0 mb-4">Education News</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-10 gap-10">
     
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        data.map((val, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              className="w-full "
              src={"http://localhost:1337" + val.attributes.image.data?.attributes?.url}
              alt={val.attributes.title}
            />
            <div className="p-4 w-full">
              <h2 className="text-xl font-semibold mb-2">{val.attributes.title.relegion}</h2>
              <p className="text-sm">{val.attributes.desc}</p>
              <p className="text-sm mt-2">{val.attributes.createdAt}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
    </>
  );
};

export default EducationPage;
