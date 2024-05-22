import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const ArticleCard = ({ val, index }) => {
  const { isSignedIn, user } = useUser();
  const [comments, setComments] = useState({});

  // Function to add a comment
  const addComment = (articleId, commentText) => {
    setComments((prevComments) => {
      const articleComments = prevComments[articleId] || [];
      return {
        ...prevComments,
        [articleId]: [...articleComments, commentText],
      };
    });
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
        <h3 className="text-lg font-bold">Comments:</h3>
        {(comments[val.id] || []).map((comment, commentIndex) => (
          <div key={commentIndex} className="p-2 border-b">
            {comment}
          </div>
        ))}

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
