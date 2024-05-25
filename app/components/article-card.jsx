import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { fetchAtrticleComments, createComment } from "../lib/client";

const ArticleCard = ({ val }) => {
  const { isSignedIn, user } = useUser();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      // Fetch data from Strapi API
      const response = await fetchAtrticleComments(val.id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const language = localStorage.getItem("language");

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {language == "ur"
          ? val.attributes?.localizations?.data[0]?.attributes?.title ||
            val.attributes.title
          : val.attributes.title}
      </h1>
      <img
        className="w-full h-auto rounded-lg mb-6"
        src={
          "http://localhost:1337" + val.attributes.image.data?.attributes?.url
        }
        alt="scholarships"
      />
      <p className="mt-4 text-gray-700 leading-relaxed">
        {language == "ur"
          ? val.attributes?.localizations?.data[0]?.attributes?.desc ||
            val.attributes.desc
          : val.attributes.desc}
      </p>
      <div className="mt-6 text-sm text-gray-500">
        {new Date(val.attributes.createdAt).toLocaleString()}
      </div>

      {/* Display comments for each article */}
      <div className="comments mt-4">
        <h3
          className="text-lg font-bold mb-4 cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          Comments ({comments.length}): {showComments ? "Hide" : "Show"}
        </h3>
        {showComments && (
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
        )}

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
