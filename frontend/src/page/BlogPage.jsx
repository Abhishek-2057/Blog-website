import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios.js'; // Replace with your axios instance

const BlogPage = () => {
    const { blogId } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);



    useEffect(() => {
        // Fetch the blog details using the blog ID
        const fetchBlog = async () => {
            try {
                const res = await axiosInstance.get(`/api/blogs/${blogId}`);
                setBlog(res.data); // Set the blog data
            } catch (error) {
                console.log('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (!blog) {
        return <div className="text-center text-gray-500 mt-10">Loading...</div>;
    }

    return (
        <div className="bg-[#0f172a] text-white min-h-screen px-6 py-10">
            <header className="max-w-3xl mx-auto">
                <Link to='/' className="text-sm text-gray-300 hover:underline">&larr; Back to Homepage</Link>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                    <span className="bg-gray-800 text-blue-400 px-2 py-1 rounded">{blog.category}</span>
                    <span>• {blog.readTime} min read</span>
                </div>
                <h1 className="text-4xl font-bold text-white mt-4 leading-tight">{blog.title}</h1>
                <div className="flex items-center gap-3 mt-6">
                    <div>
                        <p className="text-white font-medium">Posted By {blog.author}</p>
                        <p className="text-gray-400 text-sm">Posted on {blog.date}</p>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto mt-10">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-xl mb-8"
            />

            {/* Render description as separate paragraphs */}
            {blog.description.split("(nextLine)").map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                </p>
            ))}
        </main>
        </div>
    );
};

export default BlogPage;
