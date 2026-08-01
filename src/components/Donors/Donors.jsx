import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../config";
function AddDonor() {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });

  // ✅ NEW STATE (location store karne ke liye)
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  // ✅ USER LOCATION FETCH
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location error:", error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert("Donor added successfully 🩸");

      setFormData({
        name: "",
        bloodGroup: "",
        city: "",
        phone: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error adding donor");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
          🩸 Add Blood Donor Details
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-red-700 text-white p-3 rounded hover:bg-red-800 transition"
          >
            Add Donor
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default AddDonor;