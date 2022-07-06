import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b-3 border-gray-600 bg-gray-500 text-center w-full fixed top-0 font-sans text-lg text-white">
      <ul>
        <li className="inline-block py-4 hover:text-gray-900">
          <Link to="/" className="pl-6 pr-8">
            Home
          </Link>
        </li>
        <li className="inline-block py-4 hover:text-gray-900">
          <Link to="/about" className="pl-6 pr-8">
            About
          </Link>
        </li>
        <li className="inline-block py-4 hover:text-gray-900">
          <Link to="/articles-list" className="pl-6 pr-8">
            Articles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
