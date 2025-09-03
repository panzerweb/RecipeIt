// components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { LikedPost } from "../hooks/UseUpdateRecipe";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const RecipeCard = ({ recipe }) => {
  const {isLiked, handleLike} = LikedPost();

  return (
    <div className="bg-gray-900 rounded-2xl shadow-md overflow-hidden max-w-sm hover:shadow-xl transition-shadow">
      {/* Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-300">{recipe.name}</h2>
        <p className="text-gray-400 mt-1">{recipe.description}</p>

        {/* Recipe Details */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
          <p><span className="font-semibold text-gray-400">Prep:</span> {recipe.prep_time} mins</p>
          <p><span className="font-semibold text-gray-400">Cook:</span> {recipe.cook_time} mins</p>
          <p><span className="font-semibold text-gray-400">Difficulty:</span> {recipe.difficulty}</p>
          <p><span className="font-semibold text-gray-400">Serving:</span> {recipe.servings}</p>
        </div>

        {/* Ingredients */}
        {recipe.ingredients && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-gray-400">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {recipe.ingredients.split(",").map((ingredient, idx) => (
                <li key={idx}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          
            {/* Handles Like post */}
            <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLike} />

            <Link
              to={`/dashboard/${recipe.id}`}
              className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-800 
                        text-white text-sm font-medium rounded-xl shadow-md 
                        hover:from-indigo-600 hover:to-indigo-950 hover:text-white
                        hover:shadow-lg transform hover:-translate-y-0.5 
                        transition-all duration-200 ease-in-out"
            >
              More Details →
            </Link>
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;
