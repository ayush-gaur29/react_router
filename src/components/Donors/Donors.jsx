import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Droplet,
  MapPin,
  Phone,
  Navigation,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { API_URL } from "../../config";
import { useToast } from "../../context/ToastContext";

function AddDonor() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ USER LOCATION STATE
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });
  const [locating, setLocating] = useState(false);

  // ✅ USER LOCATION FETCH
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocating(false);
        },
        (error) => {
          console.log("Location error:", error);
          setLocating(false);
        },
        { timeout: 10000 }
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bloodGroup) {
      showToast("Please select your blood group.", "warning");
      return;
    }

    setLoading(true);

    try {
      // 🔑 TOKEN FETCH
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/donors/add`,
        {
          ...formData,
          location, // ✅ LOCATION SEND
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Donor registration successful! Thank you for saving lives 🩸", "success");

      setFormData({
        name: "",
        bloodGroup: "",
        city: "",
        phone: "",
      });

      // Navigate to donor directory so they see their listing
      setTimeout(() => {
        navigate("/finddonor");
      }, 1200);

    } catch (error) {
      console.error(error.response?.data || error.message);
      showToast(error.response?.data?.message || "Error adding donor. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="max-w-3xl w-full">
        
        {/* Registration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-red-950/5 relative overflow-hidden">
          
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-sm">
              <HeartPulse className="w-7 h-7 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Register as a Blood Donor
            </h1>
            <p className="text-slate-600 text-sm">
              Your details will be listed in the secure directory so patients nearby can reach you in urgent emergencies.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Blood Group Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-600">
                    <Droplet className="w-4 h-4 fill-red-600" />
                  </div>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-8 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition cursor-pointer appearance-none"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                  </select>
                </div>
              </div>

              {/* City / District */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  City / District <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. New Delhi, Budaun"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

            </div>

            {/* Geolocation Notice Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
              </div>
              <div className="flex-1 text-xs">
                <p className="font-bold text-slate-800">Automatic Proximity Matching</p>
                <p className="text-slate-500 mt-0.5">
                  {location.lat && location.lng ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      GPS coordinates captured ({location.lat.toFixed(2)}, {location.lng.toFixed(2)}) for precise distance matching.
                    </span>
                  ) : locating ? (
                    <span className="text-amber-700 font-medium">Acquiring current GPS coordinates...</span>
                  ) : (
                    <span>
                      Coordinates not yet detected.{" "}
                      <button
                        type="button"
                        onClick={fetchLocation}
                        className="text-red-600 underline font-semibold cursor-pointer ml-0.5"
                      >
                        Click to detect location
                      </button>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-70 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registering Donor Profile...</span>
                </>
              ) : (
                <>
                  <span>Complete Donor Registration</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>

          {/* Privacy footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>You can remove your donor status anytime from your profile dropdown.</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default AddDonor;