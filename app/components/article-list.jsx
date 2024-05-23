import React from "react";
import ArticleCard from "./article-card"; // Adjust the import path as needed

const ArticleList = ({ loading, data, dashbord = false }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left px-2 mt-0 mb-6">
        Welcome
      </h1>
      {dashbord && (
        <p className="mb-5">
          This is the dashboard for the news article website. Please subscribe
          to the latest news articles and leave comments on articles.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">Loading...</p>
        ) : data.length ? (
          data.map((val) => <ArticleCard val={val} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
