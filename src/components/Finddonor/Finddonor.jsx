// Finddonor.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../config";
function Finddonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/donors`)
      .then((res) => {
        setDonors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const filteredDonors = donors
    .filter(
      (donor) =>
        donor.city?.toLowerCase().includes(search.toLowerCase()) ||
        donor.bloodGroup?.toLowerCase().includes(search.toLowerCase())
    )
    .map((donor) => {
      if (
        userLocation &&
        donor.location &&
        donor.location.lat &&
        donor.location.lng
      ) {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          donor.location.lat,
          donor.location.lng
        );

        return { ...donor, distance };
      }

      return donor;
    })
    .sort((a, b) => (a.distance || 999) - (b.distance || 999));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Donor List
        </h2>

        <input
          type="text"
          placeholder="Search by city or blood group"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-full mb-4 focus:outline-none focus:border-red-600"
        />

        <ul>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <li
                key={donor._id}
                className="border rounded p-4 mb-2 flex justify-between items-center transition duration-200 hover:border-red-600 cursor-pointer"
              >
                <div>
                  <strong>{donor.name}</strong> | {donor.bloodGroup} |{" "}
                  {donor.city}
                  <br />

                  {donor.distance !== undefined && (
                    <>
                      <span>{donor.distance.toFixed(1)} km away</span>
                      <br />
                    </>
                  )}

                  <a
                    href={`tel:${donor.phone}`}
                    className="text-blue-600 underline"
                  >
                    {donor.phone}
                  </a>
                </div>

                <div className="text-green-600 font-semibold">
                  Available
                </div>
              </li>
            ))
          ) : (
            <p>No donors found.</p>
          )}
        </ul>
      </div>
    </motion.div>
  );
}

export default Finddonor;