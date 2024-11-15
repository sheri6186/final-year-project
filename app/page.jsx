"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "./lib/client";
import ArticleList from "./components/article-list";
import SubscribeForm from "./components/subscribeForm"
export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const language = localStorage.getItem("language");
        const response = await fetchAtrticlesAPI(
          `api/articles?_locale=${language}&populate=*`
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

  return (<><ArticleList loading={loading} data={data} dashbord={true} />
  <subscribeForm />
  </>);
}
