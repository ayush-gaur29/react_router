import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Search,
  MapPin,
  Droplet,
  HeartPulse,
  Activity,
  ShieldCheck,
  Clock,
  Users,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Navigation,
  HeartHandshake,
  Award,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
  Building2
} from 'lucide-react';
import { API_URL } from '../../config';

export default function Home() {
  const navigate = useNavigate();

  // Dynamic Backend Data States
  const [stats, setStats] = useState({
    totalDonors: null,
    totalCities: null,
    citiesList: [],
    totalBloodGroups: null,
    totalUsers: null
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [recentDonor, setRecentDonor] = useState(null);
  const [nearestDonor, setNearestDonor] = useState(null);

  // Quick Search States
  const [selectedBlood, setSelectedBlood] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // 1. Fetch Real Stats from Backend
  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        // Call backend stats endpoint
        const [statsRes, donorsRes] = await Promise.allSettled([
          axios.get(`${API_URL}/api/donors/stats`),
          axios.get(`${API_URL}/api/donors`)
        ]);

        if (!isMounted) return;

        if (statsRes.status === 'fulfilled' && statsRes.value.data) {
          setStats(statsRes.value.data);
        } else if (donorsRes.status === 'fulfilled' && Array.isArray(donorsRes.value.data)) {
          // Fallback calculation from donors list if stats endpoint unavailable
          const donors = donorsRes.value.data;
          const uniqueCities = [...new Set(donors.map((d) => d.city).filter(Boolean))];
          const uniqueGroups = [...new Set(donors.map((d) => d.bloodGroup).filter(Boolean))];
          setStats({
            totalDonors: donors.length,
            totalCities: uniqueCities.length,
            citiesList: uniqueCities,
            totalBloodGroups: uniqueGroups.length,
            totalUsers: donors.length
          });
        }

        if (donorsRes.status === 'fulfilled' && Array.isArray(donorsRes.value.data) && donorsRes.value.data.length > 0) {
          const donors = donorsRes.value.data;
          setRecentDonor(donors[0]); // Most recently registered donor

          // Check for user geolocation to calculate real closest donor
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                if (!isMounted) return;
                const userLat = pos.coords.latitude;
                const userLng = pos.coords.longitude;

                // Haversine calculation
                const donorsWithDistance = donors
                  .filter((d) => d.location && d.location.lat && d.location.lng)
                  .map((d) => {
                    const R = 6371; // Earth radius in km
                    const dLat = (d.location.lat - userLat) * (Math.PI / 180);
                    const dLng = (d.location.lng - userLng) * (Math.PI / 180);
                    const a =
                      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(userLat * (Math.PI / 180)) *
                        Math.cos(d.location.lat * (Math.PI / 180)) *
                        Math.sin(dLng / 2) *
                        Math.sin(dLng / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;
                    return { ...d, distance };
                  })
                  .sort((a, b) => a.distance - b.distance);

                if (donorsWithDistance.length > 0) {
                  setNearestDonor(donorsWithDistance[0]);
                }
              },
              () => {},
              { timeout: 5000 }
            );
          }
        }
      } catch (err) {
        console.error('Error loading homepage stats:', err);
      } finally {
        if (isMounted) setStatsLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // Tips array
  const tips = [
    {
      title: "Iron-Rich Diet",
      text: "Consume iron-rich foods like beans, spinach, raisins, lentils, or lean poultry before donating.",
      icon: "🥗"
    },
    {
      title: "Hydration First",
      text: "Drink at least 500ml of extra water or juice before your appointment to maintain healthy blood pressure.",
      icon: "💧"
    },
    {
      title: "Rest & Sleep",
      text: "Get 7-8 hours of quality sleep the night before your scheduled blood donation.",
      icon: "😴"
    },
    {
      title: "Nutritious Pre-Meal",
      text: "Eat a healthy, low-fat meal 2-3 hours before donating. Avoid heavy fried foods.",
      icon: "🍎"
    },
    {
      title: "Post-Donation Rest",
      text: "Rest for 10-15 minutes and enjoy light refreshments immediately after donating.",
      icon: "☕"
    },
    {
      title: "Multiply Hope",
      text: "A single whole blood donation can be separated into red cells, platelets, and plasma to save up to 3 lives.",
      icon: "❤️"
    }
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  // Blood Compatibility Matrix Data
  const [activeBloodType, setActiveBloodType] = useState('O+');
  const bloodData = {
    'O-': { give: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], receive: ['O-'], badge: 'Universal Donor' },
    'O+': { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'], badge: 'Most In-Demand' },
    'A-': { give: ['A-', 'A+', 'AB-', 'AB+'], receive: ['A-', 'O-'], badge: 'Rare & Vital' },
    'A+': { give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'], badge: 'High Match Rate' },
    'B-': { give: ['B-', 'B+', 'AB-', 'AB+'], receive: ['B-', 'O-'], badge: 'Critical Need' },
    'B+': { give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'], badge: 'Common in India' },
    'AB-': { give: ['AB-', 'AB+'], receive: ['AB-', 'A-', 'B-', 'O-'], badge: 'Rare Group' },
    'AB+': { give: ['AB+'], receive: ['All Blood Types'], badge: 'Universal Recipient' },
  };

  // Quick Search Handler
  const handleQuickSearch = (e) => {
    e.preventDefault();
    const query = [selectedBlood, searchCity].filter(Boolean).join(' ');
    navigate('/finddonor', { state: { search: query, bloodGroup: selectedBlood, city: searchCity } });
  };

  // Detect Geolocation for quick search
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setIsLocating(false);
        navigate('/finddonor');
      },
      (err) => {
        console.error('Location error:', err);
        setIsLocating(false);
        navigate('/finddonor');
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50">
      
      {/* 🔴 Top Urgent Announcement Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>
              <strong>URGENT DONOR NETWORK:</strong> Over 12,000+ daily blood units needed in hospitals across India.
            </span>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-white/95 hover:text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition shrink-0"
          >
            Post Emergency Patient Request
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 🌟 HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Soft background ambient glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Trust Badge & Quick Search */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-7 text-center lg:text-left"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-red-200/90 shadow-sm text-red-700 text-xs sm:text-sm font-bold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>Free · Verified · Nearby Donors</span>
              </div>

              {/* Urgent Emotional Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                Someone is waiting for <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
                  your blood type.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Connect directly with nearby voluntary blood donors in seconds. Powered by real-time geolocation matching and an instant direct-contact network across India.
              </p>

              {/* ⚡ Quick Search Widget Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-red-100/90 shadow-xl shadow-red-950/5 relative text-left"
              >
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-red-600" />
                    Quick Donor Search
                  </span>
                  {stats.totalDonors !== null && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      ● {stats.totalDonors} Verified Donors Live
                    </span>
                  )}
                </div>

                <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  
                  {/* Blood Type Dropdown */}
                  <div className="sm:col-span-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
                      <Droplet className="w-4 h-4 fill-red-600" />
                    </div>
                    <select
                      value={selectedBlood}
                      onChange={(e) => setSelectedBlood(e.target.value)}
                      className="w-full pl-9 pr-8 py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition appearance-none cursor-pointer"
                    >
                      <option value="">Blood Group (All)</option>
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

                  {/* City / Location Input with Dynamic Datalist */}
                  <div className="sm:col-span-5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      list="cities-list"
                      placeholder="Enter city or district..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full pl-9 pr-10 py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    />
                    {stats.citiesList && stats.citiesList.length > 0 && (
                      <datalist id="cities-list">
                        {stats.citiesList.map((city, idx) => (
                          <option key={idx} value={city} />
                        ))}
                      </datalist>
                    )}
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      title="Use live GPS location"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin text-red-600' : ''}`} />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Find Donors</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </form>
              </motion.div>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/finddonor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <Droplet className="w-5 h-5 fill-white" />
                  <span>Find a Donor Nearby</span>
                </Link>

                <Link
                  to="/donors"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white hover:bg-red-50/50 text-red-700 border-2 border-red-600/80 font-bold rounded-xl shadow-sm hover:border-red-600 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <HeartPulse className="w-5 h-5 text-red-600" />
                  <span>Register as a Donor</span>
                </Link>
              </div>

              {/* Quick Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free & Direct Call</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Zero Middlemen Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>24/7 Community Support</span>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Hero Visual & Floating Micro-Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Background gradient halo */}
              <div className="absolute w-72 sm:w-88 h-72 sm:h-88 bg-gradient-to-tr from-red-600/20 via-rose-500/15 to-transparent rounded-full blur-2xl -z-10" />

              {/* Main Illustration Container */}
              <div className="relative p-4">
                <img
                  src="pic1.png"
                  alt="Blood Donation Connect"
                  className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-2xl animate-float"
                />

                {/* Floating Stat Card 1: Dynamic Live Nearest / Recent Donor */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-3 -left-4 sm:left-0 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-10"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {nearestDonor ? "Closest Verified Donor" : "Active Donor Network"}
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {nearestDonor ? (
                        <>
                          <span className="text-red-600 font-extrabold">{nearestDonor.bloodGroup}</span> · {nearestDonor.name} (
                          <span className="text-emerald-600">{nearestDonor.distance.toFixed(1)} km away</span>)
                        </>
                      ) : recentDonor ? (
                        <>
                          <span className="text-red-600 font-extrabold">{recentDonor.bloodGroup}</span> · {recentDonor.name} in{' '}
                          <span className="text-slate-600">{recentDonor.city}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-600 font-extrabold">All Blood Groups</span> · Real-Time GPS
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Floating Stat Card 2: Impact Ratio */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-red-100 flex items-center gap-3 z-10"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                    <HeartHandshake className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Impact Ratio</p>
                    <p className="text-xs font-bold text-slate-800">
                      1 Whole Donation = <span className="text-red-600 font-extrabold">3 Lives Saved</span>
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 📊 DYNAMIC PLATFORM STATS BAR */}
      <section className="py-12 bg-white border-t border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Stat 1: Total Donors */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-red-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              {statsLoading ? (
                <div className="h-9 w-20 bg-slate-200 rounded-lg animate-pulse my-1" />
              ) : (
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {stats.totalDonors !== null ? stats.totalDonors : 0}
                  <span className="text-red-600 text-2xl sm:text-3xl ml-0.5">+</span>
                </div>
              )}
              <div className="text-sm font-bold text-slate-700 mt-0.5">Voluntary Donors</div>
              <div className="text-xs text-slate-400 mt-1">Registered & verified in database</div>
            </motion.div>

            {/* Stat 2: Total Cities */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              {statsLoading ? (
                <div className="h-9 w-16 bg-slate-200 rounded-lg animate-pulse my-1" />
              ) : (
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {stats.totalCities !== null ? stats.totalCities : 0}
                  <span className="text-rose-600 text-2xl sm:text-3xl ml-0.5">+</span>
                </div>
              )}
              <div className="text-sm font-bold text-slate-700 mt-0.5">Cities Covered</div>
              <div className="text-xs text-slate-400 mt-1">Across active donor regions</div>
            </motion.div>

            {/* Stat 3: Direct Response Time */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Instant
              </div>
              <div className="text-sm font-bold text-slate-700 mt-0.5">1-Tap Direct Call</div>
              <div className="text-xs text-slate-400 mt-1">0 middleman wait times</div>
            </motion.div>

            {/* Stat 4: Free Access */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                100%
              </div>
              <div className="text-sm font-bold text-slate-700 mt-0.5">Free & Open Access</div>
              <div className="text-xs text-slate-400 mt-1">Community humanitarian project</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🚀 HOW IT WORKS SECTION (Full Brand Red Theme with Seamless Wave Dividers) */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-red-700 via-red-800 to-rose-900 text-white relative overflow-hidden">
        
        {/* 🌊 Top Static Curved Wave Divider (Flush with White Stats Bar above, 0px seam) */}
        <div className="absolute -top-px left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            className="w-full h-7 sm:h-11 lg:h-16 text-white fill-current block"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C360,45 720,10 1080,40 C1260,55 1380,25 1440,15 L1440,0 L0,0 Z" />
          </svg>
        </div>

        {/* Ambient subtle glow orbs */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider shadow-sm border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-red-200" />
              Simple 3-Step Flow
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              How RedRoute Connects You in Emergencies
            </h2>
            <p className="text-red-100 text-base sm:text-lg leading-relaxed">
              Engineered to eliminate bureaucracy and delays when every single minute matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 relative group cursor-default text-left"
            >
              <div className="absolute top-6 right-6 text-4xl font-black text-slate-100 group-hover:text-red-100 transition-colors">
                01
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Search Blood Type & City
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Filter instantly by required blood group (A+, B+, O-, etc.) and your city, or allow instant browser GPS detection.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 relative group cursor-default text-left"
            >
              <div className="absolute top-6 right-6 text-4xl font-black text-slate-100 group-hover:text-red-100 transition-colors">
                02
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Haversine Distance Match
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our algorithm computes exact spherical distances to all registered donors and ranks the closest available heroes first.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 relative group cursor-default text-left"
            >
              <div className="absolute top-6 right-6 text-4xl font-black text-slate-100 group-hover:text-red-100 transition-colors">
                03
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1-Tap Direct Connection
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dial the verified donor immediately via phone or submit an automated email alert for urgent hospital requirements.
              </p>
            </motion.div>

          </div>

          {/* Bottom Action */}
          <div className="mt-14 text-center">
            <Link
              to="/donatedblood"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 shadow-md backdrop-blur-md transition-all group cursor-pointer"
            >
              <span>Learn about blood donation types & eligibility</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* 🌊 Bottom Static Curved Wave Divider (Flush with White Compatibility Section below, 0px seam) */}
        <div className="absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            className="w-full h-7 sm:h-11 lg:h-16 text-white fill-current block"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C360,10 720,45 1080,15 C1260,5 1380,30 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>

      </section>

      {/* 🩸 INTERACTIVE BLOOD COMPATIBILITY MATRIX */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
              Medical Reference Guide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Blood Type Compatibility Matrix
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Click any blood group to explore who you can donate to and receive blood from.
            </p>
          </div>

          {/* Blood Type Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10">
            {Object.keys(bloodData).map((type) => (
              <button
                key={type}
                onClick={() => setActiveBloodType(type)}
                className={`px-5 py-3 rounded-2xl font-black text-base sm:text-lg transition-all duration-200 cursor-pointer ${
                  activeBloodType === type
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105 ring-4 ring-red-100'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Active Blood Type Breakdown Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800"
          >
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Badge & Highlight */}
              <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
                <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {bloodData[activeBloodType].badge}
                </span>
                <div className="text-6xl font-black text-red-500 tracking-tight my-1">
                  {activeBloodType}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Selected Blood Group Profile
                </p>
              </div>

              {/* Right Compatibility Details */}
              <div className="md:col-span-8 space-y-6">
                
                {/* Can Give Blood To */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Can Give Blood To:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {bloodData[activeBloodType].give.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive Blood From */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-2.5">
                    <Droplet className="w-4 h-4 text-rose-400 fill-rose-400" />
                    Can Receive Blood From:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {bloodData[activeBloodType].receive.map((t) => (
                      <span key={t} className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 💡 DONOR PREPARATION & TIPS CAROUSEL */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              {/* Tip Icon / Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-sm">
                {tips[currentTip].icon}
              </div>

              {/* Tip Content */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                    Donor Health Tip #{currentTip + 1}
                  </span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTip}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-lg font-bold text-slate-900">
                      {tips[currentTip].title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mt-1 leading-relaxed">
                      {tips[currentTip].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  aria-label="Previous tip"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  aria-label="Next tip"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 🚨 EMERGENCY BLOOD REQUEST CTA CARD */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-800 via-red-700 to-rose-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Background pattern glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Urgent Patient In Need?
                </div>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  Need Blood Immediately for Hospital Surgery or Trauma?
                </h2>
                <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                  Post an urgent request with patient details. Our automated alert system and nearby registered donors will be notified instantly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Link
                  to="/contact"
                  className="px-7 py-4 bg-white text-red-700 hover:bg-red-50 font-black rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-center cursor-pointer"
                >
                  Create Emergency Request
                </Link>
                <Link
                  to="/finddonor"
                  className="px-7 py-4 bg-red-900/60 hover:bg-red-900/80 text-white border border-white/30 font-bold rounded-xl transition text-center cursor-pointer"
                >
                  Browse Donors List
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
