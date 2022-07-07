import React from "react";

const PageNotFound = () => {
  return (
    <>
      <img
        className="my-10 mx-auto "
        src="assets/no-content.png"
        alt="notFound"
      />
      <h3 className="sm:text-3xl text-xl text-[#605E5E] font-bold text-center">
        404: Page not found
      </h3>
    </>
  );
};

export default PageNotFound;
