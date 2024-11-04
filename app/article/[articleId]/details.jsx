import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using react-router for routing
import { useUser } from "@clerk/clerk-react";
import { fetchArticleDetails, fetchAtrticleComments, createComment } from "../lib/client"; // Adjust the import paths as necessary
import SubscribeButton from "../../components/SubscribeButton";// Import the button


const ArticleDetails = () => {
  const { articleId } = useParams();
  const { isSignedIn, user } = useUser();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const articleResponse = await fetchArticleDetails(articleId);
      setArticle(articleResponse.data);
      const commentsResponse = await fetchAtrticleComments(articleId);
      setComments(commentsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [articleId]);

  const addComment = async (commentText) => {
    const data = {
      addedById: user.id,
      addedByName: user.firstName + " " + user.lastName,
      articleId: articleId,
      text: commentText,
    };

    await createComment(data);
    await fetchDataFromApi();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-4xl mb-6">{article.attributes.title}</h1>
      <img
        className="w-full h-auto rounded-lg mb-6"
        src={"http://localhost:1337" + article.attributes.image.data?.attributes?.url}
        alt="article"
      />
      <p className="text-gray-700 leading-relaxed">{article.attributes.desc}</p>
      <div className="mt-6 text-sm text-gray-500">
        {new Date(article.attributes.createdAt).toLocaleString()}
      </div>

      <div className="comments mt-8">
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
                  <span>{new Date(comment.attributes.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {isSignedIn && (
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 mt-2 border rounded"
            onKeyPress={(event) => {
              if (event.key === "Enter" && event.target.value.trim()) {
                addComment(event.target.value.trim());
                event.target.value = ""; // Clear input after adding comment
              }
            }}
          />
        )}
      </div>
      <div>
      <SubscribeButton />

      </div>
    </div>
  );
};

export default ArticleDetails;
