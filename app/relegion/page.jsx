"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";
import ArticleCard from "./../components/article-card";

const relegionpage = () => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const categoriesResp = await fetchAtrticlesAPI("api/categories/3");
        setCategories(categoriesResp.data);
        console.log("categories: ", categoriesResp.data);
        const response = await fetchAtrticlesAPI(
          "api/articles?filters[categories][id][$in]=3&populate=*"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);
  return (
    <>
      <h1 className="font-bold text-2xl px-2 mt-0 mb-4">Relegion News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          data.map((val, index) => (
            <ArticleCard key={index} val={val} index={index} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default relegionpage;
