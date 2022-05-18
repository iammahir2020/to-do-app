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
    <div class="navbar max-w-7xl mx-auto">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? (
              <>
                <li className="mb-3">
                  <button class="btn btn-secondary text-black">
                    {user?.displayName || "User"}
                  </button>
                </li>
                <li className="mb-3">
                  <button
                    onClick={handleSignOut}
                    class="btn btn-primary text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="mb-3">
                <button
                  onClick={() => navigate("/login")}
                  class="btn btn-primary text-white"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" class="btn btn-ghost normal-case text-xl">
          To Do App
        </Link>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          {user ? (
            <>
              <li className="lg:mx-3">
                <button class="btn btn-secondary text-black">
                  {user?.displayName || "User"}
                </button>
              </li>
              <li className="lg:mx-3">
                <button
                  onClick={handleSignOut}
                  class="btn btn-primary text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="lg:mx-3">
              <button
                onClick={() => navigate("/login")}
                class="btn btn-primary text-white"
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
