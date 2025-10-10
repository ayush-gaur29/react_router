import React from 'react'
import { motion } from "framer-motion";

export default function About() {

  const listVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1 }}
    >
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <img
                src="blood.png"
                alt="image"
              />
            </div>
            <motion.div 
              className="md:7/12 lg:w-6/12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold md:text-4xl text-red-700">
                Millions suffer due to blood unavailability — join us to save lives.
              </h2>

              <ul className="mt-6 list-disc text-red-700">
                {[
                  "Quickly search for nearby blood donors and find the help you need in urgent situations.",
                  "Register yourself as a donor and contribute to saving lives in your community.",
                  "Our platform is simple and easy to use, allowing anyone to connect with donors or recipients instantly.",
                  "Get notified when someone nearby needs blood, and respond quickly to make a difference.",
                  "Join our mission to save lives by making blood donation accessible and hassle-free for everyone.",
                  "Your single donation is a lifetime of hope."
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    className="mb-4"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    <span className="text-gray-600 block">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
