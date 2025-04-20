import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BlogCard = ({ blogId, blogimage, BlogTitle, blogDescription, category, postDate }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCardClick = () => {
        if (blogId) {
            navigate(`/blog/${blogId}`); // Navigate to BlogPage with the blog ID
        } else {
            console.error("Invalid blog ID");
        }
    };

    return (
        <div onClick={handleCardClick} className="cursor-pointer">
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={blogimage} alt="Blog Post" className="w-full h-48 object-cover" />
                <div className="p-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full font-medium">{category}</span>
                        <span>{postDate}</span>
                    </div>
                    <h2 className="text-xl font-bold mt-2">{BlogTitle}</h2>
                    <p className="text-gray-700 mt-2">{blogDescription.slice(0, 100)}...</p>
                    <div className="text-blue-600 font-medium hover:underline flex items-center mt-4">
                        Read More <span className="ml-1 text-blue-600 font-medium">&rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;