import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left px-4">
        {/* BlogFolio Section */}
        <div >
          <h3 className="font-medium text-lg">ReadBlog</h3>
          <p className="text-gray-300 mt-2 mr-3">
            Sharing thoughts and insights about technology, lifestyle, and productivity.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-medium text-lg">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-300 hover:text-white cursor-pointer">Home</li>
            <li className="text-gray-300 hover:text-white cursor-pointer">Categories</li>
            <li className="text-gray-300 hover:text-white cursor-pointer">About Me</li>
            <li className="text-gray-300 hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="font-medium text-lg ml-18">Categories</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white cursor-pointer">Technology</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Coding</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Travel</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Business</li>
            </ul>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white cursor-pointer">Lifestyle</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Health</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Education</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Entertainment</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Finance</li>
            </ul>
          </div>
        </div>

        {/* Follow Me Section */}
        <div>
          <h3 className="font-medium text-lg">Follow Me</h3>
          <div className="flex justify-center md:justify-start mt-2 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white" aria-label="GitHub">
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      

      <hr className="border-gray-700 my-4" />
      <div className="text-center text-gray-300 mt-8">
        © 2025 ReadBlog. All rights reserved.
      </div>
    </footer>
  );
};


export default Footer;