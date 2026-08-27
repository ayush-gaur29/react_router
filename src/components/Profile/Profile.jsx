import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Plus, Trash2, HeartPulse, ArrowLeft } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../config";
import { useToast } from "../../context/ToastContext";

function Profile() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleAddDonor = () => {
    navigate("/donors");
  };

  const handleDeleteDonor = async () => {
    if (!window.confirm("Are you sure you want to delete yourself as a donor?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/donors/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("You are no longer registered as a donor 🩸", "info");
    } catch (error) {
      console.error(error);
      showToast("Error deleting donor profile.", "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-rose-600" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
          </div>
          <h1 className="text-2xl font-black text-slate-900">{user?.name || "My Account"}</h1>
          {user?.email && <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAddDonor}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-red-600/20 hover:shadow-red-600/35 transition cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Add / Update Donor Profile</span>
          </button>

          <button
            onClick={handleDeleteDonor}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-semibold py-3.5 px-4 rounded-xl border border-slate-200 hover:border-red-200 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span>Remove Me as Donor</span>
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;

