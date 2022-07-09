import React, { useState } from "react";

const CommentForm = ({ articleName, setArticleDetails }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const postComment = async () => {
    const result = await fetch(`/api/article/${articleName}/post-comments`, {
      method: "post",
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await result.json();
    setArticleDetails(body);
    setUsername("");
    setCommentText("");
  };
  return (
    <form className="shadow rounded px-8 py-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900 font-sans">
        Add a Comment
      </h3>
      <label className="text-gray-700 text-sm font-bold mb-2 font-sans">
        Name :
      </label>
      <input
        type="text"
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Comment :
      </label>
      <textarea
        rows="4"
        cols="50"
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 
        leading-tight focus:outline-none focus:shadow-outline"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white hover:text-gray-900 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        onClick={() => postComment()}
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
