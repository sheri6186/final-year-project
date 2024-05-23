"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "./lib/client";
import ArticleCard from "./components/article-card";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const response = await fetchAtrticlesAPI("api/articles?&populate=*");
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
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">
        This is the dashboard for the news article website. Please subscribe to
        the latest news articles and leave comments on articles.
      </p>
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
}
