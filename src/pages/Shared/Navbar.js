import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="navbar max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72"
          >
            {user ? (
              <>
                <li className="mb-3">
                  <button className="btn btn-secondary text-black">
                    {user?.displayName || "User"}
                  </button>
                </li>
                <li className="mb-3">
                  <button
                    onClick={handleSignOut}
                    className="btn btn-primary text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="mb-3">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-primary text-white"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          To Do App
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {user ? (
            <>
              <li className="lg:mx-3">
                <button className="btn btn-secondary text-black">
                  {user?.displayName || "User"}
                </button>
              </li>
              <li className="lg:mx-3">
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="lg:mx-3">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary text-white"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
