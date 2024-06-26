import React from "react";
import ArticleCard from "./article-card"; // Adjust the import path as needed

const ArticleList = ({ loading, data, dashbord = false }) => {
  const language = localStorage.getItem("language");

  return (
    <div className="container mx-auto px-4 py-8">
      {dashbord && (
        <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left px-2 mt-0 mb-6">
          {language == "en" ? "Welcome" : "خوش آمدید"}
        </h1>
      )}

      {dashbord && (
        <p className="mb-5">
          {language == "en"
            ? "This is the dashboard for the news article website. Please subscribe to the latest news articles and leave comments on articles."
            : "یہ نیوز آرٹیکل ویب سائٹ کا ڈیش بورڈ ہے۔ براہ کرم تازہ ترین خبروں کے مضامین کو سبسکرائب کریں اور مضامین پر تبصرے چھوڑیں۔"}
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
