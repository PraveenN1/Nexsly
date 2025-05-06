import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";
import Sidebar1 from "@/components/homepage/Sidebar1";

const Settings = () => {
  const [userData, setUserData] = useState({
    username: "loading...",
    posts: 0,
    activity: "None",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true,
        });
        setUserData({
          username: res.data.username,
          posts: res.data.posts.length,
          activity: res.data.activity || "Low",
        });
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="fixed w-full z-10">
        <Navbar />
      </div>

      <div className="flex pt-16 h-svh w-full">
        <Sidebar1 />

        <div className="bg-[#0E1113] min-h-screen p-6 pt-10 w-full lg:ml-64 flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-6 text-white">Settings</h1>

          <div className="w-full max-w-5xl space-y-4 px-4">
            <div className=" p-4 shadow rounded">
              <p className="text-gray-600">Username</p>
              <p className="font-medium">{userData.username}</p>
            </div>

            <div className=" p-4 shadow rounded">
              <p className="text-gray-600">Number of Posts</p>
              <p className="font-medium">{userData.posts}</p>
            </div>

            <div className="p-4 shadow rounded">
              <p className="text-gray-600">Activity</p>
              <p className="font-medium">{userData.activity}</p>
            </div>

            <button className="w-full  text-white py-2 rounded ">
              Claim Account
            </button>

            <button className="w-full text-white py-2 rounded ">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
