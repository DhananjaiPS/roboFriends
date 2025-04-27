import React from 'react';

const LoadingCard = () => (
  <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-6 flex flex-col items-center space-y-4 animate-pulse">
    <div className="w-32 h-32 rounded-full bg-white/30"></div>
    <div className="h-4 bg-white/30 rounded w-3/4"></div>
    <div className="h-4 bg-white/30 rounded w-1/2"></div>
  </div>
);

export default LoadingCard;
