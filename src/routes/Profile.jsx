import React, {useState, useEffect} from 'react'
import { Navbar } from "../components/Navbar";
import { fetchRecipes } from "../hooks/fetchRecipes";
import {MyCard} from '../components/MyCard';
import { UserAuth } from '../context/AuthContext';


export const Profile = () => {
    const {data: recipes, isLoading, isError, error} = fetchRecipes();
    const {session} = UserAuth();
    const [isTrue, setIsTrue] = useState(false);

    // Use Effect should be at the top always of conditions
    // Checks if the session id matches the recipe's user_id
    useEffect(() => {
        if (recipes && session?.user?.id) {
            const isOwner = recipes.some(recipe => recipe.user_id === session.user.id);
            console.log(isOwner)
            setIsTrue(isOwner);
        }
    }, [recipes, session]);

    if (isLoading) return <div className="text-gray-400 text-center mt-10">Loading recipe...</div>;
    if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;

    return (
        <div>
            <Navbar />

            <div className="flex items-center gap-4 max-w-md mx-auto my-3 bg-gray-900 text-gray-200 rounded-2xl p-4 shadow-lg">
                {/* Profile Avatar (placeholder if none) */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-lg font-semibold text-white">
                    {session?.user?.user_metadata?.display_name?.[0]?.toUpperCase() || "U"}
                </div>

                {/* User Info */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-white">
                    {session?.user?.user_metadata?.display_name || "User"}
                    </h2>
                    <p className="text-sm text-gray-400">{session?.user?.email}</p>
                    <p className="text-sm text-gray-300">Owner</p>
                </div>
            </div>

            <div className="grid mt-8 mb-4 max-w-fit mx-auto gap-6 justify-center 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    isTrue &&
                    recipes.map((recipe) => (
                        <MyCard 
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))
                }
            </div>
        </div>
    )
}
