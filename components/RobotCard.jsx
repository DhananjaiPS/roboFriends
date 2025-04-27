import React from 'react';

const RobotCard = ({ id, name, email }) => (
  <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    <img
      className="w-32 h-32 mb-4 rounded-full border-2 border-white/50"
      src={`https://robohash.org/${id}?size=180x180`}
      alt={`Robot ${name}`}
    />
    <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
    <p className="text-gray-600">{email}</p>
  </div>
);

export default RobotCard;
