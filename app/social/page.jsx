"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";
import ArticleList from "./../components/article-list";

const socialpage = () => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const categoriesResp = await fetchAtrticlesAPI("api/categories");
        setCategories(categoriesResp.data);
        const language = localStorage.getItem("language");

        const response = await fetchAtrticlesAPI(
          `api/articles?_locale=${language}&filters[categories][id][$in]=1&populate=*`
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

export default socialpage;
