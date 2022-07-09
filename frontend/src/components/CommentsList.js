import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <div key={index}>
          <h4 className="text-l font-sans font-bold">{comment.username}</h4>
          <p className="mt-1 mb-4">{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
