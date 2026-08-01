import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaTint, FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../config";
function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try {

      await axios.post(
        `${API_URL}/api/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      alert("Signup successful! Please login.");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Signup failed");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        className="flex bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full"
      >

        {/* LEFT DESIGN */}

        <div className="hidden md:flex flex-col justify-center items-center bg-red-700 text-white w-1/2 p-10">

          <FaTint size={70} className="mb-6 animate-pulse"/>

          <h2 className="text-3xl font-bold text-center mb-3">
            Join RedRoute
          </h2>

          <p className="text-sm text-center text-red-100">
            Become a donor and help save lives by connecting people who need blood urgently.
          </p>

        </div>


        {/* FORM */}

        <div className="w-full md:w-1/2 p-8">

          <h2 className="text-3xl font-bold text-red-700 text-center mb-1">
            Create Account 🩸
          </h2>

          <p className="text-gray-500 text-sm text-center mb-6">
            Join us & become a life saver
          </p>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="mb-4 relative">

              <FaUser className="absolute left-3 top-3.5 text-gray-400"/>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

            </div>


            {/* EMAIL */}

            <div className="mb-4 relative">

              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400"/>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

            </div>


            {/* PASSWORD */}

            <div className="mb-4 relative">

              <FaLock className="absolute left-3 top-3.5 text-gray-400"/>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="mb-5 relative">

              <FaLock className="absolute left-3 top-3.5 text-gray-400"/>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

            </div>


            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2.5 rounded-lg font-semibold hover:bg-red-800 transition duration-300 shadow-md"
            >
              Create Account
            </button>

          </form>


          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </motion.div>

    </div>

  );
}

export default Signup;