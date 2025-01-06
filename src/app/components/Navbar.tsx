<<<<<<< HEAD
import React from "react";

const Navbar = () => {
=======
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

>>>>>>> frontend
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md w-full">
      <h1 className="text-white font-bold text-2xl">
        <a href="/">EduLite</a>
      </h1>
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="text-white hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/courses" className="text-white hover:underline">
            Courses
          </a>
        </li>
        <li>
          <a href="/about" className="text-white hover:underline">
            About
          </a>
        </li>
<<<<<<< HEAD
        <li>
          <a href="/admin" className="text-white hover:underline">
            Admin Dashboard
          </a>
        </li>
        <li>
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </li>
        <li>
          <a href="/signup" className="text-white hover:underline">
            Signup
          </a>
        </li>
=======
        {isLoggedIn ? (
          <>
            <li>
              <a href="/dashboard" className="text-white hover:underline">
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className="text-white hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="text-white hover:underline">
                Signup
              </a>
            </li>
          </>
        )}
>>>>>>> frontend
      </ul>
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> frontend
