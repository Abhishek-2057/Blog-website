import React from "react";
import { FaLaptopCode, FaLeaf, FaPlane, FaCode, FaBriefcase, FaHeartbeat, FaGraduationCap, FaFilm, FaDollarSign } from "react-icons/fa"; // Import additional icons
import { Link } from "react-router-dom"; // Use Link for navigation

const ExploreTopics = () => {
    const topics = [
        { name: "Technology", color: "bg-blue-100", textColor: "text-blue-500", icon: <FaLaptopCode />, path: "/technology" },
        { name: "Coding", color: "bg-purple-100", textColor: "text-purple-500", icon: <FaCode />, path: "/coding" },
        { name: "Travel", color: "bg-orange-100", textColor: "text-orange-500", icon: <FaPlane />, path: "/travel" },
        { name: "Business", color: "bg-yellow-100", textColor: "text-yellow-500", icon: <FaBriefcase />, path: "/business" },
        { name: "Lifestyle", color: "bg-green-100", textColor: "text-green-500", icon: <FaLeaf />, path: "/lifestyle" },
        { name: "Health", color: "bg-red-100", textColor: "text-red-500", icon: <FaHeartbeat />, path: "/health" },
        { name: "Education", color: "bg-indigo-100", textColor: "text-indigo-500", icon: <FaGraduationCap />, path: "/education" },
        { name: "Entertainment", color: "bg-pink-100", textColor: "text-pink-500", icon: <FaFilm />, path: "/entertainment" },
        { name: "Finance", color: "bg-teal-100", textColor: "text-teal-500", icon: <FaDollarSign />, path: "/finance" },
    ];

    return (
        <div className="flex flex-col w-screen bg-white items-center py-20 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Explore Categories</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        to={topic.path}
                        className={`flex items-center space-x-2 px-5 py-3 rounded-full ${topic.color} hover:shadow-lg transition-shadow`}
                    >
                        <span className={`text-lg ${topic.textColor}`}>{topic.icon}</span>
                        <span className={`font-medium ${topic.textColor}`}>{topic.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreTopics;
