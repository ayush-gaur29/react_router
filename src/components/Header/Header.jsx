import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Droplet,
  HeartPulse,
  LogOut,
  ShieldCheck,
  PhoneCall,
  Search,
  Home as HomeIcon,
  Info,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../config";
import { useToast } from "../../context/ToastContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDonor, setIsDonor] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast("Logged out successfully.", "info");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDonorStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/api/donors/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsDonor(res.data.isDonor);
      } catch (error) {
        console.error("Error fetching donor status:", error);
        setIsDonor(false);
      }
    };

    fetchDonorStatus();
  }, [token]);

  const handleDeleteDonor = async () => {
    if (!window.confirm("Are you sure you want to remove yourself as an active donor?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/donors/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("You have been removed as a donor 🩸", "info");
      setIsDonor(false);
      setProfileOpen(false);
    } catch (error) {
      console.error(error);
      showToast("Error removing donor status.", "error");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall className="w-4 h-4" /> },
    { name: "Find Donors", path: "/finddonor", icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="blood_logo.png" className="h-14 w-14 object-contain" alt="Logo" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
                    RedRoute
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-0.5">
                  Blood Donor Finder
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-red-700 bg-red-50/90 shadow-xs"
                      : "text-slate-600 hover:text-red-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right: Auth Buttons / User Profile */}
          <div className="flex items-center gap-3">
            {!token ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-red-700 hover:bg-slate-100 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20 hover:shadow-red-600/35 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* Profile Circle Trigger */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition cursor-pointer"
                  aria-label="User Profile Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate hidden md:inline">
                    {user?.name || "My Account"}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/80 z-50 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-5 py-4 bg-gradient-to-r from-red-700 to-rose-700 text-white">
                        <p className="text-xs text-red-100 font-medium">Logged in as</p>
                        <p className="text-sm font-bold truncate mt-0.5">{user?.name || "Registered User"}</p>
                        {user?.email && <p className="text-xs text-red-200 truncate">{user.email}</p>}
                      </div>

                      {/* Options */}
                      <div className="p-2 space-y-1 text-sm">
                        {!isDonor ? (
                          <Link
                            to="/donors"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-red-700 font-semibold transition"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Register as Donor</span>
                          </Link>
                        ) : (
                          <button
                            onClick={handleDeleteDonor}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-700 font-semibold transition text-left cursor-pointer"
                          >
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span>Remove Donor Status</span>
                          </button>
                        )}

                        <div className="border-t border-slate-100 my-1"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-bold transition text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-red-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200/80 px-4 pt-2 pb-6 space-y-3"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                      isActive
                        ? "text-red-700 bg-red-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>

            {!token && (
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <Link
                  to="/login"
                  className="w-full py-2.5 text-center text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="w-full py-2.5 text-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

