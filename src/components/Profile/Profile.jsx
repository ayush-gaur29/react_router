import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddDonor = () => {
    navigate("/donors");
  };

  const handleDeleteDonor = async () => {
    if (!window.confirm("Are you sure you want to delete yourself as a donor?")) {
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/donors/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("You are no longer registered as a donor 🩸");
    } catch (error) {
      console.error(error);
      alert("Error deleting donor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
          My Profile
        </h2>

        <button
          onClick={handleAddDonor}
          className="w-full mb-4 bg-red-700 text-white p-3 rounded hover:bg-red-700"
        >
          ➕ Add / Update Donor
        </button>

        <button
          onClick={handleDeleteDonor}
          className="w-full bg-gray-700 text-white p-3 rounded hover:bg-gray-800"
        >
          ❌ Delete Me as Donor
        </button>
      </div>
    </div>
  );
}

export default Profile;
