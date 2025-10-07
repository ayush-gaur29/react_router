

// AddDonor.jsx
import React, { useState, useEffect } from "react";

function Finddonor() {
  const [donors, setDonors] = useState(() => {
    // Load donors from localStorage or empty array
    const saved = localStorage.getItem("donors");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDonors(prev => {
      const newDonors = [...prev, formData];
      localStorage.setItem("donors", JSON.stringify(newDonors));
      return newDonors;
    });
    setFormData({ name: "", bloodGroup: "", city: "", mobile: "" });
    alert("Donor added successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
        <span>🩸</span> Add Blood Donor Details
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
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
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
  );
}

export default Finddonor;


