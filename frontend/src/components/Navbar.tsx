import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import { NotificationContext } from "../contexts/NotificationContext";

export function Navbar() {
  const { user, logout } = useContext(AuthContext);
  // const { unreadMessageCount } = useContext(NotificationContext);
  return (
    <>
      <nav className="bg-white border-gray-200 px-4 sm:px-6 py-2.5 rounded dark:bg-gray-800">
        <div className="max-w-5xl mt-5 mx-auto flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center">
            <span
              style={{
                fontFamily: "Awesome",
                color: "purple",
              }}
              className="text-7xl self-center font-semibold whitespace-nowrap dark:text-white"
            >
              Random Chat
            </span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {user && (
                <>
                  <span className="text-white">Logged in: {user.username}</span>
                  <button
                    className="block text-xl py-2 pr-4 pl-3 text-purple-800 md:p-0"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto ">
        <Outlet />
      </div>
    </>
  );
}
