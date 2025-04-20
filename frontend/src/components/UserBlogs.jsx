import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import useAuthStore from "../store/authStore.js"; // Zustand store for user authentication
import BlogCard from "./BlogCard"; // Import the BlogCard component
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null); // Blog selected for deletion
    const [confirmationInput, setConfirmationInput] = useState(""); // Input for confirmation
    const user = useAuthStore((state) => state.user); // Get the logged-in user

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await axiosInstance.get(`/api/user-blogs/${user._id}`);
                setBlogs(response.data);
            } catch (err) {
                console.error("Error fetching user blogs:", err.response?.data?.error || err.message);
            }
        };

        if (user) {
            fetchUserBlogs();
        }
    }, [user]);

    const handleDelete = async () => {
        if (confirmationInput !== selectedBlog.title) {
            toast.error("Blog title does not match. Please try again.");
            return;
        }

        try {
            await axiosInstance.delete(`/api/delete-blog/${selectedBlog._id}`, {
                data: { userId: user._id }, // Include the userId in the request body
            });
            toast.success("Blog deleted successfully!"); // Show success toast
            setBlogs(blogs.filter((blog) => blog._id !== selectedBlog._id)); // Remove the deleted blog from the state
            setSelectedBlog(null); // Close the modal
            setConfirmationInput(""); // Reset the input
        } catch (err) {
            console.error("Error deleting blog:", err.response?.data?.error || err.message);
            toast.error(err.response?.data?.error || "Failed to delete the blog."); // Show error toast
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Blogs</h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <div key={index} className="relative">
                            <BlogCard
                                blogId={blog._id}
                                blogimage={blog.image}
                                BlogTitle={blog.title}
                                blogDescription={blog.description}
                                category={blog.category}
                                postDate={blog.date}
                            />
                            <button
                                onClick={() => setSelectedBlog(blog)} // Open the modal with the selected blog
                                className="absolute top-3 right-17 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No blogs found.</p>
            )}

            {/* Confirmation Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-4">
                            To confirm deletion, type the title of the blog: <strong>{selectedBlog.title}</strong>
                        </p>
                        <input
                            type="text"
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setSelectedBlog(null);
                                    setConfirmationInput("");
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default MyBlogs;