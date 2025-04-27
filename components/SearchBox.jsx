import React from 'react';

const SearchBox = ({ searchField, onSearchChange }) => (
  <input
    className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 placeholder-gray-600 rounded-lg px-4 py-2 mb-8 w-full max-w-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/30"
    type="search"
    placeholder="Search robots..."
    value={searchField}
    onChange={onSearchChange}
  />
);

export default SearchBox;
