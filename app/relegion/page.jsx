"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";
import ArticleList from "./../components/article-list";

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
  return <ArticleList loading={loading} data={data} />;
};

export default relegionpage;
