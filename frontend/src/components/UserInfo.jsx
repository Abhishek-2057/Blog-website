import React from "react";
import useAuthStore from "../store/authStore.js"; // Import Zustand store

const UserInfo = () => {
    const user = useAuthStore((state) => state.user); // Zustand user state

    return (
        <span className="text-blue-800">
            Welcome, {user?.fullName || "User"}!
        </span>
    );
};

export default UserInfo;