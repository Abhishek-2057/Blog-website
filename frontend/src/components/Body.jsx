import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ backgroundImage }) => {
  return (
    <div>
        <div className="relative h-130 flex items-center justify-center text-center px-4 overflow-hidden">
          {/* Background image layer (optional) */}
          {backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-80" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome to My Thoughts!
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              Read articles on tech, lifestyle, productivity, and more.
            </p>
            <Link to='/allblogs' className="bg-white text-blue-600 hover:bg-blue-100 font-semibold px-6 py-2 rounded-full shadow-md transition">
              Explore Posts
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 mb-10">
            <div className="text-3xl font-bold text-center mb-5">Welcome to Our Blog</div>
            <div className='text-3xl font-bold text-center mb-5 bg-green-300' >Latest Blogs</div>
        </div>
        
    </div>
  );
};

export default HeroSection;
