import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { fetchAtrticleComments, createComment } from "../lib/client";

const ArticleCard = ({ val, index }) => {
  const { isSignedIn, user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataFromApi = async () => {
    try {
      // Fetch data from Strapi API
      const response = await fetchAtrticleComments(val.id);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  // Function to add a comment
  const addComment = async (articleId, commentText) => {
    const data = {
      addedById: user.id,
      addedByName: user.firstName + " " + user.lastName,
      articleId: articleId,
      text: commentText,
    };

    await createComment(data);
    await fetchDataFromApi();
  };

  return (
    <div key={index} className="m-5 p-3 h-100 w-1/2 mb-2">
      <div>{val.attributes.title}</div>
      <img
        className="h-1000 w-1/2 mt-10"
        src={
          "http://localhost:1337" + val.attributes.image.data?.attributes?.url
        }
        alt={val.attributes.title}
      />
      <div className="mt-10">{val.attributes.desc}</div>
      <div>{new Date(val.attributes.createdAt).toLocaleDateString()}</div>

      {/* Display comments for each article */}
      <div className="comments mt-4">
        <h3 className="text-lg font-bold mb-4">Comments:</h3>
        <div className="space-y-4">
          {comments.map((comment, commentIndex) => (
            <div
              key={commentIndex}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p className="text-gray-800">{comment.attributes.text}</p>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Added by: {comment.attributes.addedByName}</span>
                <span>
                  {new Date(comment.attributes.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add a comment input */}
        {isSignedIn && (
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 mt-2 border rounded"
            onKeyPress={(event) => {
              if (event.key === "Enter" && event.target.value.trim()) {
                addComment(val.id, event.target.value.trim());
                event.target.value = ""; // Clear input after adding comment
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
