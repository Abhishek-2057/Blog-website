import React, { useEffect, useState } from 'react';
import Body from '../components/Body';
import homeImage from '../assets/homeimage.png';
import BlogCard from '../components/BlogCard';
import ExploreTopics from '../components/ExploreTopics';
import { axiosInstance } from '../lib/axios.js'; // Import your axios instance

const Home = () => {
    const [blogs, setBlogs] = useState([]); // State to store fetched blogs
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        // Fetch blogs from the backend
        const fetchBlogs = async () => {
            try {
                const res = await axiosInstance.get('/api/blogs'); // Replace with your API endpoint
                const fetchedBlogs = res.data.reverse(); // Reverse the array to get the latest blogs first
                setBlogs(fetchedBlogs); // Set the fetched blogs to state
                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 mt-10">Loading blogs...</div>;
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <Body backgroundImage={homeImage} />

            {/* Blog Cards Section */}
            <div className="flex flex-wrap gap-13 justify-center">
                {blogs.length > 0 ? (
                    blogs.slice(0, 3).map((blog) => ( // Display the first 3 blogs from the reversed array
                        <BlogCard
                            key={blog._id} // Use a unique key for each blog
                            blogId={blog._id}
                            blogimage={blog.image}
                            BlogTitle={blog.title}
                            blogDescription={blog.description}
                            category={blog.category}
                            postDate={blog.date}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No blogs available.</p>
                )}
            </div>

            {/* Explore Topics Section */}
            <div className="flex flex-col items-center justify-center mt-15 mb-15">
                <ExploreTopics />
            </div>
        </div>
    );
};

export default Home;