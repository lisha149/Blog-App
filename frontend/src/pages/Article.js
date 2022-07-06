import React from "react";
import { useParams } from "react-router-dom";
import articleContent from "../content/ArticleContent";

const Article = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  if (!article) return <h1>Article doesn't exist</h1>;
  return (
    <>
      <h1 className="sm:text-3xl text-xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      <p className="mx-auto leading-loose text-base text-justify mb-4">
        {article.content}
      </p>
    </>
  );
};

export default Article;
