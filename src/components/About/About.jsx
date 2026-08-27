import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Users,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Globe2
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Real-Time GPS Distance Matching",
      desc: "Our Haversine algorithm matches patients with the closest verified voluntary donors to minimize transit time during critical emergencies."
    },
    {
      icon: <Users className="w-6 h-6 text-rose-600" />,
      title: "Community-Driven & 100% Free",
      desc: "Zero commercial interests, no hidden charges, and direct communication between donor and patient attendants."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Privacy First Architecture",
      desc: "Donors retain full control over their availability status, with 1-click removal or updates from their profile dashboard."
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Emergency Alert Broadcasting",
      desc: "Urgent patient blood requests are instantly relayed via automated EmailJS notifications to nearest coordinator networks."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-xl shadow-red-950/5 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative">
                <div className="w-64 sm:w-80 h-64 sm:h-80 bg-red-100/60 rounded-3xl absolute -rotate-6 top-0 left-0 -z-10" />
                <img
                  src="blood.png"
                  alt="RedRoute Blood Donation Network"
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl shadow-lg relative z-10 bg-white p-4 border border-slate-100"
                />
              </div>
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Our Mission & Vision
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Millions face critical delays finding blood.{" "}
                <span className="text-red-600">We are changing that.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                In India, thousands of units of blood are needed each day for emergencies, surgeries, cancer therapy, and trauma care. RedRoute was built to bridge the gap between people in critical need and selfless voluntary donors nearby.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl sm:text-3xl font-black text-red-600">12,000+</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">Daily Blood Unit Deficit in India</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600">&lt; 10 Mins</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">Donation Process to Save 3 Lives</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Core Pillars Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Why RedRoute</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engineered for Speed, Trust & Impact
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Built with modern technology to deliver zero-friction humanitarian assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-lg hover:border-red-200 transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  {f.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Your single donation is a lifetime of hope.
            </h2>
            <p className="text-red-100 text-sm sm:text-base max-w-xl mx-auto">
              Join our fast-growing network of donors across India. It takes only 2 minutes to register.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/donors"
                className="w-full sm:w-auto px-8 py-4 bg-white text-red-700 hover:bg-red-50 font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm"
              >
                Register as a Donor
              </Link>
              <Link
                to="/finddonor"
                className="w-full sm:w-auto px-8 py-4 bg-red-900/50 hover:bg-red-900/80 text-white border border-white/30 font-bold rounded-xl transition text-sm"
              >
                Search Nearby Donors
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

