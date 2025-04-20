import React from "react";
import useAuthStore from "../store/authStore.js";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

const LogoutButton = () => {
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout(); // Update Zustand state
        localStorage.removeItem("user"); // Clear user data from localStorage
        console.log("User logged out");
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-white bg-green-500 rounded-lg hover:bg-red-600"
        >
            <FiLogOut size={20} /> {/* Add the logout icon */}
            Log Out
        </button>
    );
};

export default LogoutButton;