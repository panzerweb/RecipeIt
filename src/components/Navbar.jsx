import React from 'react'
import { useNavigate, Link, NavLink } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
    e.preventDefault();

    try {
        await signOut();
        navigate("/");
    } catch (err) {
        setError("An unexpected error occurred."); // Catch unexpected errors
    }
    };
    // console.log(session);
    return (
        <nav className="">
            <div className="max-w-100 mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 shadow-md">
                <div className="flex justify-between h-16 items-center">
                {/* Left side - Logo / Title */}
                <div className="flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-400">
                    RecipeIt
                    </h1>
                </div>

                {/* Right side - User info */}
                <div className="flex items-center space-x-6">
                    <h2 className="text-gray-400 font-medium">
                    Welcome,{" "}
                    <span className="font-semibold text-indigo-600">
                        {session?.user?.user_metadata?.display_name || "User"}
                    </span>
                    </h2>
                    <button
                    onClick={handleSignOut}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition duration-200"
                    >
                    Sign out
                    </button>
                </div>
                </div>
            </div>

            <div className="max-w-6xl bg-gray-900 px-4 mx-auto mt-5 py-5 shadow-md rounded-xl">
                <ul className='flex justify-center gap-5'>
                    <NavLink to='/dashboard' 
                        className={({ isActive }) => (isActive ? 'text-indigo-600 transition-all font-semibold cursor-pointer' : 'text-gray-200 hover:text-indigo-600')}
                    >
                        News Feed
                    </NavLink>
                    <NavLink to='/favorites' 
                        className={({ isActive }) => (isActive ? 'text-indigo-600 transition-all font-semibold cursor-pointer' : 'text-gray-200 hover:text-indigo-600')}
                    >
                        Favorites
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
}
