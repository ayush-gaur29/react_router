import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Droplet,
  HeartPulse,
  Microscope,
  Syringe,
  Hospital,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const cardData = [
  {
    icon: <Droplet className="text-red-600 w-7 h-7" />,
    title: "Whole Blood Donation",
    subtitle: "Most Frequent · 470 ml",
    description:
      "This is the most common type of donation, taking about 10 minutes. It is vital for trauma patients, surgical procedures, and emergency hemorrhage treatment.",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: <Microscope className="text-rose-600 w-7 h-7" />,
    title: "Platelet Donation",
    subtitle: "5-Day Shelf Life · Vital",
    description:
      "Platelets are tiny cell fragments essential for blood clotting. They are critically needed by leukemia patients, chemotherapy patients, and major trauma surgeries.",
    color: "bg-rose-50 text-rose-600"
  },
  {
    icon: <HeartPulse className="text-amber-600 w-7 h-7" />,
    title: "Plasma Donation",
    subtitle: "Frozen up to 1 Year",
    description:
      "Plasma contains critical antibodies, clotting factors, and proteins. It provides life-saving therapy for severe burn victims, shock, and liver disease.",
    color: "bg-amber-50 text-amber-600"
  },
  {
    icon: <Syringe className="text-emerald-600 w-7 h-7" />,
    title: "Rigorous Screening",
    subtitle: "100% Sterile & Safe",
    description:
      "Every single donation is tested for blood type, infectious markers (HIV, Hepatitis, Malaria) and safety, guaranteeing the highest standard for recipients.",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: <Hospital className="text-blue-600 w-7 h-7" />,
    title: "Hospital Distribution",
    subtitle: "24/7 ICU & Trauma",
    description:
      "Donated blood supports emergency surgeries, cancer treatments, childbirth complications, and chronic conditions like thalassemia every single second.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: <Users className="text-purple-600 w-7 h-7" />,
    title: "Tripled Life Impact",
    subtitle: "1 Donor = 3 Lives",
    description:
      "Because whole blood is separated into three individual components (RBCs, Platelets, Plasma), a single donation directly saves up to three different individuals.",
    color: "bg-purple-50 text-purple-600"
  },
];

export default function DonatedBlood() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Medical Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Learn About Donated Blood
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Understand how each component of your blood donation helps save lives and powers medical interventions across India.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:border-red-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {card.subtitle}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors mt-0.5">
                    {card.title}
                  </h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-red-600 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Standard WHO Guidelines</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blood Components Shelf Life Bar with Red Theme Gradient & Animated Floating Blood Drops */}
        <div className="relative rounded-3xl p-8 sm:p-12 shadow-2xl border border-red-900/50 bg-gradient-to-br from-red-950 via-rose-950 to-slate-950 text-white overflow-hidden">
          
          {/* Ambient Red/Rose Corner Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* 🩸 Animated Floating Blood Drop Decoration 1 (Top Left) */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: [0, 6, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 left-6 sm:left-12 pointer-events-none text-red-500/20"
          >
            <Droplet className="w-16 h-16 sm:w-24 sm:h-24 fill-red-500/20" />
          </motion.div>

          {/* 🩸 Animated Floating Blood Drop Decoration 2 (Bottom Right) */}
          <motion.div
            animate={{
              y: [0, 16, 0],
              x: [0, -10, 0],
              rotate: [0, -8, 0]
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute -bottom-6 right-8 sm:right-16 pointer-events-none text-rose-500/20"
          >
            <Droplet className="w-20 h-20 sm:w-28 sm:h-28 fill-rose-500/20" />
          </motion.div>

          {/* 🩸 Animated Floating Blood Drop Decoration 3 (Middle Left - Desktop) */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              x: [0, -6, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute top-1/2 -left-4 hidden md:block pointer-events-none text-red-400/15"
          >
            <Droplet className="w-14 h-14 fill-red-400/15" />
          </motion.div>

          {/* 🩸 Animated Floating Blood Drop Decoration 4 (Top Right Center) */}
          <motion.div
            animate={{
              y: [0, 14, 0],
              x: [0, 6, 0],
              rotate: [0, -4, 0]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-8 right-1/4 pointer-events-none text-red-500/15"
          >
            <Droplet className="w-12 h-12 sm:w-16 sm:h-16 fill-red-500/15" />
          </motion.div>

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Component Shelf Life
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Why Continuous Blood Donation is Critical
              </h2>
              <p className="text-red-200/80 text-sm leading-relaxed">
                Blood cannot be manufactured synthetically. Because each component expires rapidly, constant voluntary donations are necessary.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-red-400/30 hover:bg-white/15 transition-all duration-300 space-y-1 group">
                <p className="text-3xl font-black text-rose-400 group-hover:scale-105 transition-transform">42 Days</p>
                <p className="text-sm font-bold text-white">Red Blood Cells</p>
                <p className="text-xs text-red-200/70">Stored at 2°C to 6°C</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-amber-400/30 hover:bg-white/15 transition-all duration-300 space-y-1 group">
                <p className="text-3xl font-black text-amber-400 group-hover:scale-105 transition-transform">5 Days Only</p>
                <p className="text-sm font-bold text-white">Platelets</p>
                <p className="text-xs text-red-200/70">Agitated constantly at 20°C</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400/30 hover:bg-white/15 transition-all duration-300 space-y-1 group">
                <p className="text-3xl font-black text-blue-400 group-hover:scale-105 transition-transform">1 Year</p>
                <p className="text-sm font-bold text-white">Fresh Frozen Plasma</p>
                <p className="text-xs text-red-200/70">Frozen at -18°C or colder</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA & Back Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/donors"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all text-sm"
          >
            <span>Register as a Donor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold rounded-xl shadow-sm transition text-sm"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </motion.section>
  );
}

