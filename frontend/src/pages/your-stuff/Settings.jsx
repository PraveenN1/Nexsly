import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";
import Sidebar1 from "@/components/homepage/Sidebar1";
import useUserDetails from "@/hooks/useUserDetails";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const { userData } = useUserDetails();
  const [activeState, setActiveState] = useState("Account");
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    try {
      await axios.put(
        "http://localhost:3000/user/delete-user",
        {},
        {
          withCredentials: true,
        }
      );
      alert("Account deleted successfully.");
      navigate("/auth/signup");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <div className="fixed w-full z-10">
        <Navbar />
      </div>

      <div className="flex pt-16  h-svh w-full">
        <Sidebar1 />
        <div className="w-full mt-5 md:ml-[5rem] lg:ml-[24rem] max-w-[45rem] ">
          <div className="flex justify-evenly mb-2  border-gray-600 ">
            {["Account", "Profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveState(tab)}
                className={`text-xl px-6 py-2 transition-all duration-300 ${
                  activeState === tab
                    ? "border-b-2  border-[#3282B8] text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeState == "Account" ? (
            <div className="bg-[#0E1113]  min-h-screen p-6 pt-10 flex flex-col items-center ">
              <div className="w-full max-w-5xl space-y-4 px-4">
                <div className=" p-4 shadow rounded flex justify-between">
                  <p className="text-gray-600">Username</p>
                  <p className="font-medium">{userData.username}</p>
                </div>
                {userData.email && (
                  <div className=" p-4 shadow rounded flex justify-between">
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                )}
                <div className=" p-4 shadow rounded flex justify-between">
                  <p className="text-gray-600">Created at</p>
                  <p className="font-medium">{userData.createdAt}</p>
                </div>

                <div className="flex gap-2 justify-center">
                  {userData.email === undefined && (
                    <button className="w-full border rounded-full bg-[#0F4C75] text-white py-2 ">
                      Claim Account
                    </button>
                  )}
                  <button
                    className="w-full border transition-all duration-150 hover:bg-red-600 border-gray-400 py-2 rounded-full "
                    onClick={() => handleDeleteUser()}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0E1113] min-h-screen p-6 pt-10 ">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="grid grid-cols-1  gap-4">
                  <p>username</p>
                  <p>posts</p>
                </div>

                <div className="text-right">
                  <button className="bg-[#3282B8] text-white px-6 py-2 rounded-full hover:bg-[#0F4C75] transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
