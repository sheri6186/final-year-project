"use client";
import React, { useEffect, useState } from "react";
import { fetchAtrticlesAPI } from "../lib/client";

export default function Home() {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState({}); // Initialize comments state as an object

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Fetch data from Strapi API
        const response = await fetchAtrticlesAPI(
          "api/articles?filters[categories][id][$in]=1&populate=*"
        );
        setData(response.data);
        // Initialize comments for each article
        const initialComments = {};
        response.data.forEach((article) => {
          initialComments[article.id] = []; // Each article's comments are an array
        });
        setComments(initialComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  // Function to add a comment to an article
  const addComment = (articleId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [articleId]: [...prevComments[articleId], comment],
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">
        This is the dashboard for the news article website. Please subscribe to
        the latest news articles and leave comments on articles.
      </p>
      <div className="flex flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          data.map((val, index) => (
            <div key={index} className="m-5 p-3 h-100 w-1/2 bg-slate-500 mb-2">
              <div>{val.attributes.title}</div>
              <img
                className="h-1000 w-1/2"
                src={
                  "http://localhost:1337" +
                  val.attributes.image.data?.attributes?.url
                }
              />
              <div>{val.attributes.desc}</div>
              <div>{val.attributes.createdAt}</div>
              {/* Display comments for each article */}
              <div className="comments">
                {comments[val.id].map((comment, commentIndex) => (
                  <div key={commentIndex}>{comment}</div>
                ))}
              </div>
              {/* Add a comment input */}
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    addComment(val.id, event.target.value);
                    event.target.value = ""; // Clear input after adding comment
                  }
                }}
              />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}
