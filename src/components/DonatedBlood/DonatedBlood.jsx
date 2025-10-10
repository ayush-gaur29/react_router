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
} from "lucide-react";

const cardData = [
  {
    icon: <Droplet className="text-red-600 w-10 h-10" />,
    title: "Whole Blood Donation",
    description:
      "This is the most common type of donation, where you donate about a pint of whole blood. It helps trauma patients and those undergoing surgery.",
  },
  {
    icon: <Microscope className="text-red-600 w-10 h-10" />,
    title: "Platelet Donation",
    description:
      "Platelets are small cell fragments that help stop bleeding. They're vital for cancer and organ transplant patients.",
  },
  {
    icon: <HeartPulse className="text-red-600 w-10 h-10" />,
    title: "Plasma Donation",
    description:
      "Plasma helps patients with liver conditions, burns, and infections. It contains antibodies and proteins that aid healing.",
  },
  {
    icon: <Syringe className="text-red-600 w-10 h-10" />,
    title: "Blood Screening",
    description:
      "Every donation is carefully tested for infectious diseases to ensure safety for recipients and donors alike.",
  },
  {
    icon: <Hospital className="text-red-600 w-10 h-10" />,
    title: "Used in Hospitals",
    description:
      "Donated blood supports surgeries, emergencies, cancer treatments, and chronic illnesses every single day.",
  },
  {
    icon: <Users className="text-red-600 w-10 h-10" />,
    title: "Help Save Lives",
    description:
      "A single blood donation can save up to three lives — your contribution truly makes a difference.",
  },
];

export default function DonatedBlood() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-800 min-h-screen px-6 sm:px-16 lg:px-24 py-16"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-700 mb-4">
          Learn About Donated Blood
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore how every part of your blood donation helps save lives and
          supports vital treatments in hospitals worldwide.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl p-6 text-center transition-all cursor-pointer"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </motion.section>
  );
}
