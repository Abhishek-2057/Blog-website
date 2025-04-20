import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js"; // Import Zustand store
import { axiosInstance } from "../lib/axios.js";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login); // Zustand login action

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both fields are required.");
            toast.error("Both fields are required.", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            // Send login request to the backend
            const response = await axiosInstance.post("api/login", {
                email,
                password,
            });

            // Handle successful login
            login(response.data.user); // Update Zustand state with user data
            setError(""); // Clear any previous errors
            toast.success("Login successful! Redirecting...", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => navigate("/"), 3000); // Redirect to the homepage or dashboard after 3 seconds
        } catch (err) {
            // Handle errors
            console.error("Login error:", err.response?.data?.error || err.message);
            const errorMessage = err.response?.data?.error || "An error occurred. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <ToastContainer /> {/* Toast container for displaying toasts */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Log In
                </h2>
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;