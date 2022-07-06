import React from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="p-4 md:w-1/2">
          <div
            className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg
          overflow-hidden"
          >
            <Link to={`/article/${article.name}`}>
              <img
                className="h-72 w-full object-cover object-center"
                src={article.thumbnail}
                alt="blog"
              />
            </Link>
            <div className="p-6">
              <Link key={index} to={`/article/${article.name}`}>
                <h3 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {article.title}
                </h3>
              </Link>
              <p className="leading-loose mb-3">
                {article.content.substring(0, 100)}...
              </p>
              <div className="flex item-center flex-wrap">
                <Link
                  className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  to={`/article/${article.name}`}
                >
                  Continue Reading...
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Articles;
