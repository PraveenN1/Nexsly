import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, Flame, Globe, PlusSquare, MessageCircle, Bell, Settings, LogOut } from "lucide-react";

const Sidebar = React.memo(({ onLogout }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    setOpen(false);
    onLogout();
  }, [onLogout]);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "font-semibold text-white flex items-center gap-3 border-2 p-2 rounded-xl"
      : "text-white flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md";

  return (
    <>
      {/* Toggle Button */}
      <div className="lg:hidden fixed top-5 left-4 z-50">
        <button 
          onClick={handleToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 mt-[65px] h-screen border-r w-64 bg-[#111112] shadow-xl flex flex-col justify-between p-5 z-40 overflow-y-auto transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-6 mt-16">
          {/* Feeds Section */}
          <section>
            <h2 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Feeds</h2>
            <div className="flex flex-col gap-2">
              <NavLink to="/" className={linkStyle} onClick={() => setOpen(false)}>
                <Home size={20} aria-hidden="true" /> Home
              </NavLink>
              <NavLink to="/popular" className={linkStyle} onClick={() => setOpen(false)}>
                <Flame size={20} aria-hidden="true" /> Popular
              </NavLink>
              <NavLink to="/all" className={linkStyle} onClick={() => setOpen(false)}>
                <Globe size={20} aria-hidden="true" /> All
              </NavLink>
            </div>
          </section>

          {/* Your Stuff Section */}
          <section>
            <h2 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Your Stuff</h2>
            <div className="flex flex-col gap-2">
              <NavLink to="/create-post" className={linkStyle} onClick={() => setOpen(false)}>
                <PlusSquare size={20} aria-hidden="true" /> Create Post
              </NavLink>
              <NavLink to="/messages" className={linkStyle} onClick={() => setOpen(false)}>
                <MessageCircle size={20} aria-hidden="true" /> Messages
              </NavLink>
              <NavLink to="/notifications" className={linkStyle} onClick={() => setOpen(false)}>
                <Bell size={20} aria-hidden="true" /> Notifications
              </NavLink>
              <NavLink to="/settings" className={linkStyle} onClick={() => setOpen(false)}>
                <Settings size={20} aria-hidden="true" /> Settings
              </NavLink>
            </div>
          </section>
        </div>

        {/* Bottom - Logout */}
        <div className="mt-10">
          <button
            className="flex items-center justify-center gap-3 p-2 w-full border rounded-xl bg-gray-700 hover:bg-black text-white transition"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut aria-hidden="true" /> Logout
          </button>
        </div>
      </nav>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
});

export default Sidebar;
