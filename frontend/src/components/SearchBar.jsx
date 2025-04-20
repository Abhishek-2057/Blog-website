import React, { useState } from 'react';
import useBlogStore from '../store/store.js'; // Import the Zustand store
import { IoSearch } from 'react-icons/io5'; // Import search icon from react-icons

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { allBlogs } = useBlogStore(); // Get all blogs from Zustand
  const setSearchBlog = useBlogStore((state) => state.setSearchBlog); // Access Zustand's setSearchBlog action

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSearchBlog(''); // Clear the searchBlog state in Zustand
      return;
    }

    // Update Zustand's searchBlog state with the query
    setSearchBlog(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <IoSearch className="text-gray-500 ml-3" size={20} /> {/* Search Icon */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search blog titles..."
          className="w-full px-4 py-2 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;

