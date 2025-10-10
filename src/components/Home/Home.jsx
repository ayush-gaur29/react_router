import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Animated scrolling text */}
            <marquee behavior="scroll" direction="left" scrollamount="6" className="text-xl font-semibold text-red-700"> 
                ❤️ “Your Blood Can Give Someone Another Chance at Life.” </marquee>

            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-4 sm:py-10 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-4 sm:px-8 lg:px-12">

        {/* ✅ Left Side — Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="pic1.png"
            alt="Blood Donation Illustration"
            className="w-72 sm:w-96 md:w-[30rem] h-auto object-contain"
          />
        </motion.div>

        {/* ✅ Right Side — Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-right space-y-6"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-700">
            The Blood Donation Process
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
            The blood donation process from the time you arrive until the time you leave takes about an hour.
            The donation itself is only about 8–10 minutes on average, but it can save multiple lives.
          </p>

          <Link
            to="/donatedblood"
            className="inline-flex items-center justify-center px-6 py-3 text-white font-medium bg-red-700 rounded-lg hover:bg-red-600 transition hover:opacity-80"
          >
            Learn about Donated Blood
          </Link>
        </motion.div>
      </div>
    </aside>


            <div className='border-t'>
                <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 px-4 mt-6">
                    {/* Tip Icon */}
                    <img 
                        src="tip.png" 
                        alt="Tip icon" 
                        className="w-12 h-12 sm:w-14 sm:h-14" 
                    />

                    {/* Tip Text */}
                    <p className="text-gray-700 text-base sm:text-lg max-w-3xl sm:max-w-none leading-relaxed">
                        <b className="text-red-700">Tip:</b> Have iron-rich foods, such as red meat, fish, poultry, beans, spinach, 
                        iron-fortified cereals or raisins.
                    </p>
                </div>
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Thanks for Visiting!</h1>
        </div>
    );
}
