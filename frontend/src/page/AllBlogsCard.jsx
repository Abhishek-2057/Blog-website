import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import { axiosInstance } from '../lib/axios.js';
import useBlogStore from '../store/store.js'; // Import Zustand store

const AllblogsCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Technology',
    'Coding',
    'Travel',
    'Business',
    'Lifestyle',
    'Health',
    'Education',
    'Entertainment',
    'Finance',
  ];

  // Get Zustand values
  const { allBlogs, setAllBlogs } = useBlogStore(); // All blogs from Zustand
  const searchTitle = useBlogStore((state) => state.searchBlog) || ''; // Ensure searchTitle is not null

  useEffect(() => {
    // Fetch all blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get(`/api/blogs/search`);
        const fetchedBlogs = res.data.reverse();
        setAllBlogs(fetchedBlogs); // Update Zustand's allBlogs state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array to run only once on mount

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    useBlogStore.setState({ searchBlog: '' }); // Reset the search query in Zustand
  };

  // Apply filters: category, search query (from Zustand's searchTitle), and allBlogs
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTitle.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="all-blogs-page px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap gap-13 justify-center">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <BlogCard
              key={index} // Use a unique key for each blog
              blogId={blog._id} 
              blogimage={blog.image}
              BlogTitle={blog.title}
              blogDescription={blog.description}
              category={blog.category}
              postDate={blog.date}
            />
          ))
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default AllblogsCard;