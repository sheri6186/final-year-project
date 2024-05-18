"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "./lib/client";

export default function Home() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const categoriesResp = await fetchAtrticlesAPI("api/categories");
        setCategories(categoriesResp.data);
        console.log("categories: ", categoriesResp.data);
        const response = await fetchAtrticlesAPI(
          "api/articles?&populate=*"
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
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">
        This is the dashboard for the news article website. Please subscribe to
        the latest news articles and leave comments on articles.
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div className="flex flex-wrap">
          {data.map(
            (
              val,
              index // Add index parameter to the map function
            ) => (
              <div className="w-full md:w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-5">
                  {val.attributes.title}
                </h1>
                <img
                  className="w-full"
                  src={
                    "http://localhost:1337" +
                    val.attributes.image.data?.attributes?.url
                  }
                  alt="scholarships"
                />
                <p>{val.attributes.desc}</p>
              </div>
            )
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
