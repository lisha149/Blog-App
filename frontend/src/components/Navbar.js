import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {}, [userInfo]);
  const navigate = useNavigate();

  return (
    <nav className="border-b-3 border-gray-600 bg-gray-500 text-center w-full fixed top-0 font-sans text-lg text-white">
      <ul>
        <li className="inline-block py-4 hover:text-gray-900">
          <Link to="/" className="pl-6 pr-8">
            BlogApp
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
        {!userInfo && (
          <>
            <li className="inline-block py-4 hover:text-gray-900 ml-40">
              <Link to="/login" className="pl-6 pr-8">
                Login
              </Link>
            </li>
            <li className="inline-block py-4 hover:text-gray-900 ml-0">
              <Link to="/register" className="pl-6 pr-8">
                Signup
              </Link>
            </li>
          </>
        )}
        {userInfo && (
          <Button
            className="inline-block py-4 hover:text-gray-900 ml-40"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
