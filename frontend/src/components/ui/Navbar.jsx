import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOutIcon, Settings, User } from "lucide-react";

const Navbar = () => {
  const [userToggle, setUserToggle] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3000/auth/user-logout",{},{withCredentials:true});
      navigate("/auth/signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-4 items-center justify-between px-6 py-3 bg-[#0E1113] border-b w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="font-bold text-2xl text-white ml-5">@ Nexsly</div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 px-4 rounded-full bg-[#1B262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 relative">
        <Link to="/create-post">
          <button className="bg-[#0F4C75] hover:bg-[#5a7a8ead] text-white rounded-full px-5 py-2 transition">
            Create
          </button>
        </Link>

        <button
          onClick={() => setUserToggle(!userToggle)}
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 relative"
          aria-roledescription="UserButton"
        >
          <User className="h-5 w-5" />
        </button>

        {userToggle && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-14 border border-gray-700 bg-[#1B262C] shadow-lg rounded-md w-40 z-50 text-white"
          >
            <button className="p-2 w-full text-left flex items-center gap-2 border-b border-gray-600 hover:bg-gray-700">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button
              onClick={handleLogOut}
              className="p-2 w-full text-left flex items-center gap-2 hover:bg-gray-700"
            >
              <LogOutIcon className="h-4 w-4" /> Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
