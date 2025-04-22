import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore.js"; // Import Zustand store
import LogoutButton from "./LogoutButton.jsx";
import UserInfo from "./UserInfo.jsx";

const Navbar = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // Zustand login state
    
    return (
        <div>
            <div className="flex items-center bg-stone-50 text-black p-4 justify-between">
                <Link to='/' className="text-2xl font-bold ml-25">
                    ReadBlog
                </Link>

                <div className="mr-25">
                    <ul className="flex gap-8 text-lg text-black">
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isLoggedIn && ( // Show PostBlog only if the user is logged in
                        <>
                            <li>
                                <Link to="/postblog">PostBlog</Link>
                            </li>

                            <li>
                            <Link to='myblogs'> MyBlogs</Link>
                            </li>
                        </>
                        )}

                        

                        <li><Link to='/allblogs'>Categories </Link></li>

                        {/* <li>
                            <Link to="/about">About</Link>
                        </li> */}

                        {/* <li>
                            <Link to="/contact">Contact</Link>
                        </li> */}

                        {/* Conditional Rendering Based on Login State */}
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <UserInfo /> {/* Render UserInfo */}
                                </li>
                                <li>
                                    <LogoutButton /> {/* Render LogoutButton */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/loginpage">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
