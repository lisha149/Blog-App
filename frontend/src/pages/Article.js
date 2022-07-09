import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleContent from "../content/ArticleContent";
import Articles from "../components/Articles";
import PageNotFound from "./PageNotFound";
import CommentsList from "../components/CommentsList";
import CommentForm from "../components/CommentForm";

const Article = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);

  const [articleDetails, setArticleDetails] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/article/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleDetails(body);
    };
    fetchData();
  }, [name]);
  if (!article) return <PageNotFound />;
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <h1 className="sm:text-3xl text-xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      <p className="mx-auto leading-loose text-base text-justify mb-4">
        {article.content}
      </p>

      <CommentsList comments={articleDetails.comments} />
      <CommentForm articleName={name} setArticleDetails={setArticleDetails} />

      <h1 className="sm:text-2x text-xl font-bold my-4 text-gray-900">
        Other Articles
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </>
  );
};

export default Article;
