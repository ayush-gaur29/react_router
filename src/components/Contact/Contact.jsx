import React from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

export default function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_f0h39um",
        "template_vr7rqzm",
        e.target,
        "lY9lX7nDXMv7AD71d"
      )
      .then(
        () => {
          alert("Message Sent Successfully ✅");
        },
        (error) => {
          alert("Failed to send ❌ " + error.text);
        }
      );

    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center items-center min-h-[650px] bg-white px-4">

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT CONTACT CARD */}

          <div className="bg-gray-100 p-10 rounded-xl shadow-md">

            <h1 className="text-4xl font-extrabold text-red-700">
              Get in touch:
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Fill the form we're here to help!
            </p>

            <div className="mt-10 space-y-6 text-gray-700">

              <div className="flex items-start gap-4">

                <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>

                <p className="font-semibold">
                  Islamnagar, Budaun,<br/>
                  Uttar Pradesh, 243723
                </p>

              </div>

              <div className="flex items-center gap-4">

                <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>

                <p className="font-semibold">
                  +91 9557565452
                </p>

              </div>

              <div className="flex items-center gap-4">

                <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>

                <p className="font-semibold">
                  gaurayush264@gmail.com
                </p>

              </div>

            </div>
          </div>


          {/* RIGHT FORM */}

          <form
            className="bg-white p-10 rounded-xl shadow-md space-y-4"
            onSubmit={sendEmail}
          >

            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              required
              className="w-full py-3 px-4 rounded-lg border border-gray-400 focus:border-red-600 focus:outline-none font-semibold"
            />

            <input
              type="text"
              name="desease"
              placeholder="Disease Name"
              required
              className="w-full py-3 px-4 rounded-lg border border-gray-400 focus:border-red-600 focus:outline-none font-semibold"
            />

            <input
              type="tel"
              name="tel"
              placeholder="Telephone Number"
              required
              className="w-full py-3 px-4 rounded-lg border border-gray-400 focus:border-red-600 focus:outline-none font-semibold"
            />

            <input
              type="text"
              name="blood_group"
              placeholder="Required Blood Group"
              required
              className="w-full py-3 px-4 rounded-lg border border-gray-400 focus:border-red-600 focus:outline-none font-semibold"
            />

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-lg mt-2 transition duration-300"
            >
              Submit
            </button>

          </form>

        </div>
      </div>
    </motion.div>
  );
}