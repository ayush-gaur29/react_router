import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Github,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a0505] via-[#120303] to-[#0a0202] text-slate-300 border-t border-red-950/60 pt-16 pb-12 mt-auto relative overflow-hidden">
      {/* Subtle ambient red brand glow in corners */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* 🚨 Top Emergency Helpline Highlight Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/90 via-[#220606] to-rose-950/90 border border-red-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                24/7 National Emergency Blood Support (India)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Dial <strong>104 / 1910</strong> for national emergency blood bank inventory and ambulance routing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:104"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition"
            >
              Dial 104 Now
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition"
            >
              Post Emergency Request
            </Link>
          </div>
        </div>

        {/* 🏛️ Balanced Footer Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
          
          {/* Col 1: Brand Info (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="blood_footer.png" className="h-28 w-28 object-contain" alt="Logo" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  RedRoute
                </span>
                <span className="text-xs text-slate-400 font-medium">Blood Donor Finder</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              India's real-time voluntary blood donor finder platform. Connecting emergency seekers with nearby registered donors using geolocation distance calculations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/50 border border-red-900/40 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>100% Free Humanitarian Project</span>
              </div>

              <a
                href="https://github.com/ayush-gaur29"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-slate-200 text-xs font-semibold border border-red-900/40 hover:border-red-700/50 transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub · ayush-gaur29</span>
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  About RedRoute
                </Link>
              </li>
              <li>
                <Link to="/finddonor" className="text-slate-400 hover:text-white transition">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link to="/donors" className="text-slate-400 hover:text-white transition">
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link to="/donatedblood" className="text-slate-400 hover:text-white transition">
                  Donation Types
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Medical Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/donatedblood" className="text-slate-400 hover:text-white transition">
                  Whole Blood Donation
                </Link>
              </li>
              <li>
                <Link to="/donatedblood" className="text-slate-400 hover:text-white transition">
                  Platelets & Plasma
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">
                  Emergency Patient Form
                </Link>
              </li>
              <li>
                <a
                  href="https://www.who.int/campaigns/world-blood-donor-day"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                >
                  <span>WHO Blood Facts</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ⚖️ Bottom Divider & Copyright */}
        <div className="pt-8 border-t border-red-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} RedRoute. Designed & Developed by{" "}
            <strong className="text-slate-300">Ayush Gaur</strong>.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-600">•</span>
            <span>MERN Stack + Geolocation API</span>
            <span className="text-slate-600">•</span>
            <span>Non-Profit Project</span>
          </div>
        </div>

      </div>
    </footer>
  );
}



