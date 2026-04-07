import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useEffect, useRef } from "react";

import axios from "axios";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDonor, setIsDonor] = useState(true); // donor status
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { name }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteDonor = async () => {
    if (!window.confirm("Are you sure you want to remove yourself as a donor?")) {
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/donors/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("You are removed as a donor 🩸");
      setIsDonor(false); // 🔥 dropdown option toggle
      setProfileOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error removing donor");
    }
  };



  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* Left section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src="blood_logo.png" className="h-14 w-14" alt="Logo" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-red-700 p-2 rounded-md"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Right-side */}
          <div className="relative flex items-center lg:order-2">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-lg text-sm px-4 py-2"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                {/* 🔵 PROFILE CIRCLE */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center"
                >
                  <User size={18} />
                </button>

                {/* DROPDOWN */}
               
  {profileOpen && (
  <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">

    {/* HEADER */}
    <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl">
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <div className="text-white">
        <p className="text-sm opacity-80">Welcome</p>
        
      </div>
    </div>

    {/* BODY */}
    <div className="py-2">

      {!isDonor && (
        <Link
          to="/donors"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Register as Donor
        </Link>
      )}

      {isDonor && (
        <button
          onClick={handleDeleteDonor}
          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Remove Donor Status
        </button>
      )}

      <div className="my-2 border-t"></div>

      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition rounded-b-2xl"
      >
        Logout
      </button>

    </div>
  </div>
)}


              </>
            )}
          </div>

          {/* 🔒 NAVIGATION LINKS — EXACTLY AS YOU GAVE */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-12 lg:mt-0">

              <li>
                <NavLink to="/" className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-red-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                }>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-red-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                }>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-red-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                }>
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink to="/finddonor" className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-red-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-600 lg:p-0`
                }>
                  Donors
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;
