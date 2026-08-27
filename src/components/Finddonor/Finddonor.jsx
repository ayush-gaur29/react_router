// Finddonor.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Search,
  MapPin,
  Phone,
  Droplet,
  Navigation,
  CheckCircle2,
  Filter,
  Users,
  AlertCircle,
  X,
  HeartHandshake
} from "lucide-react";
import { API_URL } from "../../config";

function Finddonor() {
  const location = useLocation();
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState(location.state?.search || "");
  const [selectedBloodPill, setSelectedBloodPill] = useState(location.state?.bloodGroup || "ALL");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);

  const bloodPills = ["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/donors`)
      .then((res) => {
        setDonors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    detectUserLocation();
  }, []);

  const detectUserLocation = () => {
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
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

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const filteredDonors = donors
    .filter((donor) => {
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        donor.city?.toLowerCase().includes(query) ||
        donor.bloodGroup?.toLowerCase().includes(query) ||
        donor.name?.toLowerCase().includes(query);

      const matchesBloodPill =
        selectedBloodPill === "ALL" ||
        donor.bloodGroup?.toUpperCase() === selectedBloodPill.toUpperCase();

      return matchesSearch && matchesBloodPill;
    })
    .map((donor) => {
      if (
        userLocation &&
        donor.location &&
        donor.location.lat &&
        donor.location.lng
      ) {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          donor.location.lat,
          donor.location.lng
        );

        return { ...donor, distance };
      }

      return donor;
    })
    .sort((a, b) => (a.distance || 9999) - (b.distance || 9999));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Geolocation Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                Live Donor Directory
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Find Blood Donors
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Real-time Haversine distance matching. Connect directly with available voluntary donors.
              </p>
            </div>

            {/* GPS Location Status Capsule */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 self-start md:self-auto">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Navigation className={`w-5 h-5 ${locating ? "animate-spin text-red-600" : ""}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Your Location Status</p>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  {userLocation ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-emerald-700">GPS Active · Distance Sorted</span>
                    </>
                  ) : locating ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                      <span className="text-amber-700">Acquiring GPS coordinates...</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      <span>GPS Off (Showing general list)</span>
                      <button
                        onClick={detectUserLocation}
                        className="text-red-600 underline font-semibold hover:text-red-700 ml-1 text-xs cursor-pointer"
                      >
                        Enable
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>

          </div>

          {/* Filter & Search Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-red-600" />
              </div>
              <input
                type="text"
                placeholder="Search by city, donor name, or blood group..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-slate-800 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Blood Type Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm font-semibold">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Group:</span>
              </div>
              {bloodPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setSelectedBloodPill(pill)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    selectedBloodPill === pill
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20 scale-105"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between px-2 text-sm text-slate-500 font-medium">
          <div>
            Showing <strong className="text-slate-800">{filteredDonors.length}</strong> available donors
            {selectedBloodPill !== "ALL" && (
              <span> for blood group <strong className="text-red-700">{selectedBloodPill}</strong></span>
            )}
            {search && (
              <span> matching "<strong className="text-slate-800">{search}</strong>"</span>
            )}
          </div>
          {filteredDonors.length > 0 && userLocation && (
            <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Sorted by proximity (closest first)
            </div>
          )}
        </div>

        {/* 🩸 SKELETON LOADERS WHILE FETCHING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-16 h-10 skeleton-box rounded-xl"></div>
                  <div className="w-20 h-6 skeleton-box rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-5 skeleton-box rounded"></div>
                  <div className="w-1/2 h-4 skeleton-box rounded"></div>
                </div>
                <div className="w-full h-11 skeleton-box rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        )}

        {/* 🌟 DONOR CARDS GRID */}
        {!loading && filteredDonors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor, index) => (
              <motion.div
                key={donor._id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:border-red-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Red Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header: Blood Group Pill + Available Badge */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-base shadow-sm shadow-red-600/30">
                      <Droplet className="w-4 h-4 fill-white" />
                      <span>{donor.bloodGroup || "N/A"}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Available</span>
                    </div>
                  </div>

                  {/* Donor Name & Location */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                      {donor.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="capitalize">{donor.city || "Location Not Specified"}</span>
                    </div>

                    {/* Distance Badge */}
                    {donor.distance !== undefined && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold mt-2">
                        <Navigation className="w-3 h-3" />
                        <span>{donor.distance.toFixed(1)} km from your location</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action: Call Now Button */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${donor.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-sm shadow-sm group-hover:shadow-md group-hover:shadow-red-600/30 transition-all duration-200 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {donor.phone}</span>
                  </a>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* 🚫 EMPTY STATE: NO DONORS FOUND */}
        {!loading && filteredDonors.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-md max-w-2xl mx-auto space-y-5">
            <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
              <AlertCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                No Donors Matching Your Criteria
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                We couldn't find any registered donors for "{search || selectedBloodPill}". Try adjusting your filters or search terms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedBloodPill("ALL");
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition cursor-pointer"
              >
                Clear All Filters
              </button>

              <Link
                to="/donors"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition"
              >
                Register as First Donor
              </Link>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

export default Finddonor;