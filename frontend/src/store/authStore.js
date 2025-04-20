import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false, // Initial state
    user: null, // Store user data
    login: (userData) => set({ isLoggedIn: true, user: userData }), // Login action
    logout: () => set({ isLoggedIn: false, user: null }), // Logout action
}));

export default useAuthStore;