import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaTint, FaEye, FaEyeSlash } from "react-icons/fa";
import  {API_URL} from "../../config";
function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    try {

      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem("token", res.data.token);

      navigate("/finddonor");

    } catch (error) {
      alert("Invalid email or password");
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

        {/* LEFT SECTION */}

        <div className="hidden md:flex flex-col justify-center items-center bg-red-700 text-white w-1/2 p-10">

          <FaTint size={70} className="mb-6 animate-pulse"/>

          <h2 className="text-3xl font-bold text-center mb-3">
            Welcome to RedRoute
          </h2>

          <p className="text-sm text-center text-red-100">
            Connecting blood donors with people who need them the most.
          </p>

        </div>

        {/* LOGIN FORM */}

        <div className="w-full md:w-1/2 p-8">

          <h2 className="text-3xl font-bold text-red-700 text-center mb-1">
            Welcome Back 🩸
          </h2>

          <p className="text-gray-500 text-sm text-center mb-6">
            Login to continue saving lives
          </p>

          <form onSubmit={handleSubmit}>

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


            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2.5 rounded-lg font-semibold hover:bg-red-800 transition duration-300 shadow-md"
            >
              Login
            </button>

          </form>


          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-700 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>

      </motion.div>

    </div>

  );
}

export default Login;