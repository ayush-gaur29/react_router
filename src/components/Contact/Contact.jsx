import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Droplet,
  HeartPulse,
  Send,
  Loader2,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Activity
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function Contact() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_f0h39um",
        "template_vr7rqzm",
        e.target,
        "lY9lX7nDXMv7AD71d"
      )
      .then(
        () => {
          showToast("Emergency blood request sent successfully! We are alerting nearby donors 🩸", "success");
          e.target.reset();
        },
        (error) => {
          showToast("Failed to send request: " + (error.text || "Please check your internet connection"), "error");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Emergency Advisory */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm sm:text-base">24/7 National Emergency Helpline</p>
              <p className="text-red-100 text-xs">For immediate critical ambulance/blood bank support, dial <strong>104 / 1910</strong> (India).</p>
            </div>
          </div>
          <a
            href="tel:104"
            className="px-4 py-2 bg-white text-red-700 hover:bg-red-50 text-xs font-black rounded-xl shadow transition shrink-0"
          >
            Call 104 Hotline
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CONTACT & EMERGENCY HELPLINE INFO (Red Theme with Floating Blood Drops) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-red-950 via-rose-950 to-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-red-900/50">
            
            {/* Ambient Red/Rose Corner Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* 🩸 Animated Floating Blood Drop 1 (Top Left) */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                x: [0, 6, 0],
                rotate: [0, 6, 0]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-3 -left-3 pointer-events-none text-red-500/20"
            >
              <Droplet className="w-16 h-16 fill-red-500/20" />
            </motion.div>

            {/* 🩸 Animated Floating Blood Drop 2 (Bottom Right) */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                x: [0, -8, 0],
                rotate: [0, -6, 0]
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute -bottom-4 right-4 pointer-events-none text-rose-500/20"
            >
              <Droplet className="w-16 h-16 fill-rose-500/20" />
            </motion.div>

            {/* 🩸 Animated Floating Blood Drop 3 (Center Right) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, -5, 0],
                rotate: [0, 4, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
              className="absolute top-1/2 right-2 pointer-events-none text-red-400/15"
            >
              <Droplet className="w-10 h-10 fill-red-400/15" />
            </motion.div>

            <div className="relative z-10 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <HeartPulse className="w-3.5 h-3.5 text-red-400" />
                  Urgent Patient Support
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Get In Touch
                </h1>
                <p className="text-red-100/80 text-sm mt-2 leading-relaxed">
                  Have an urgent requirement or question? Submit this form to broadcast an alert, or contact our support team directly.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-200/70 uppercase tracking-wider">Location Headquarters</p>
                    <p className="font-semibold text-white mt-0.5">
                      New Delhi, India (Available Nationwide)
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-200/70 uppercase tracking-wider">Direct Coordinator Phone</p>
                    <a
                      href="tel:+919876543210"
                      className="font-bold text-emerald-400 hover:text-emerald-300 transition mt-0.5 block"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-200/70 uppercase tracking-wider">Official Email</p>
                    <a
                      href="mailto:contact@redroute.app"
                      className="font-semibold text-blue-400 hover:text-blue-300 transition mt-0.5 block"
                    >
                      contact@redroute.app
                    </a>
                  </div>
                </div>

              </div>

              {/* Trust assurances */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-red-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant automated email dispatch to active team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Average response time within 15 minutes</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: EMERGENCY BLOOD REQUEST FORM */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 relative overflow-hidden">
            
            {/* Top gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-rose-600" />

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Urgent Requirement</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Post Patient Blood Request
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Please provide accurate patient and hospital details so responders can act promptly.
              </p>
            </div>

            <form onSubmit={sendEmail} className="space-y-4">
              
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Disease / Medical Reason */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Disease / Medical Condition / Surgery <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="desease"
                    placeholder="e.g. Emergency Surgery, Dengue, Thalassemia"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Contact Telephone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Attendant Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="tel"
                    placeholder="Active 10-digit mobile number"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Required Blood Group */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Required Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-600">
                    <Droplet className="w-4 h-4 fill-red-600" />
                  </div>
                  <select
                    name="blood_group"
                    required
                    className="w-full pl-10 pr-8 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition cursor-pointer appearance-none"
                  >
                    <option value="">Select Required Blood Group</option>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-70 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Broadcasting Emergency Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Emergency Blood Request</span>
                  </>
                )}
              </button>

            </form>

            <p className="text-center text-xs text-slate-400 mt-4">
              All requests are dispatched to active blood donor coordinators instantly.
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}