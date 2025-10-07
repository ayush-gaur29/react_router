// Donors.jsx
import React, { useState, useEffect } from "react";

function Finddonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("donors");
    setDonors(saved ? JSON.parse(saved) : []);
  }, []);

  const filteredDonors = donors.filter(donor =>
    donor.city.toLowerCase().includes(search.toLowerCase()) ||
    donor.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Donor List</h2>
      <input
        type="text"
        placeholder="Search by city or blood group"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />
      <ul>
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor, index) => (
            <li
              key={index}
              className="border rounded p-4 mb-2 flex justify-between items-center"
            >
              <div>
                <strong>{donor.name}</strong> | {donor.bloodGroup} | {donor.city}
                <br />
                <a href={`tel:${donor.mobile}`} className="text-blue-600 underline">
                  {donor.mobile}
                </a>
              </div>
              <div className="text-green-600 font-semibold">Available</div>
            </li>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </ul>
    </div>
  );
}

export default Finddonor;
