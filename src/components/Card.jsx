// components/RecipeCard.jsx
import React from "react";

const RecipeCard = ({ recipe }) => {
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
        <p className="text-gray-600 mt-1">{recipe.description}</p>

        {/* Recipe Details */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
          <p><span className="font-semibold">Prep:</span> {recipe.prep_time} mins</p>
          <p><span className="font-semibold">Cook:</span> {recipe.cook_time} mins</p>
          <p><span className="font-semibold">Difficulty:</span> {recipe.difficulty}</p>
          <p><span className="font-semibold">Serving:</span> {recipe.serving}</p>
        </div>

        {/* Ingredients */}
        {recipe.ingredients && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-gray-800">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {recipe.ingredients.split(",").map((ingredient, idx) => (
                <li key={idx}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
