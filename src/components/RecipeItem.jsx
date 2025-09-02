import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRecipeById } from '../hooks/fetchRecipes';
import { UserAuth } from '../context/AuthContext';

export const RecipeItem = () => {
    const {id} = useParams();
    const {data: recipes, isLoading, isError, error} = fetchRecipeById(id);
    const {session} = UserAuth();
    const [isTrue, setIsTrue] = useState(false);

    // Use Effect should be at the top always of conditions
    // Checks if the session id matches the recipe's user_id
    useEffect(() => {
        if (recipes && session?.user?.id) {
            const isOwner = recipes.some(recipe => recipe.user_id === session.user.id);
            setIsTrue(isOwner);
        }
    }, [recipes, session]);


    if (isLoading) return <div className="text-gray-400 text-center mt-10">Loading recipe...</div>;
    if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;


    return (
        <div className="min-h-screen bg-gray-950 flex justify-center p-6">
        {recipes.map((recipe) => (
            <div
            key={recipe.id}
            className="bg-gray-900 rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden"
            >
            {/* Image */}
            {recipe.image && (
                <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 object-cover"
                />
            )}

            {/* Content */}
            <div className="p-6">
                <h1 className="text-3xl font-bold text-white">{recipe.name}</h1>
                <p className="mt-2 text-gray-400 text-lg">{recipe.description}</p>

                {/* Recipe Details */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-gray-400 font-semibold">Prep Time</p>
                    <p className="text-white">{recipe.prep_time} mins</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-gray-400 font-semibold">Cook Time</p>
                    <p className="text-white">{recipe.cook_time} mins</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-gray-400 font-semibold">Difficulty</p>
                    <p className="text-white">{recipe.difficulty}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-gray-400 font-semibold">Serving</p>
                    <p className="text-white">{recipe.serving}</p>
                </div>
                </div>

                {/* Ingredients */}
                {recipe.ingredients && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-300">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                    {recipe.ingredients.split(",").map((ingredient, idx) => (
                        <li key={idx}>{ingredient.trim()}</li>
                    ))}
                    </ul>
                </div>
                )}

                {/* Steps */}
                {recipe.steps && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-300">Instructions</h2>
                    <ol className="list-decimal list-inside text-gray-400 mt-2 space-y-2">
                    {recipe.steps.split(".").map((step, idx) => (
                        step.trim() && <li key={idx}>{step.trim()}</li>
                    ))}
                    </ol>
                </div>
                )}

                {/* Conditional buttons */}
                <div className="mt-8 flex justify-between">
                    <a
                        href="/dashboard"
                        className="px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 
                                text-white rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 
                                hover:shadow-lg transform hover:-translate-y-0.5 
                                transition-all duration-200 ease-in-out"
                    >
                        ← Back to Recipes
                    </a>

                </div>
            </div>
            </div>
        ))}
        </div>
    );
}
