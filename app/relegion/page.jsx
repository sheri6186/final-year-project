"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client.js";

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

export default relegionpage;