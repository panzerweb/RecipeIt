import React from 'react'
import { Link } from 'react-router-dom';

export const MyCard = ({recipe}) => {
  // Deletion Handle
  const handleDelete = () => {
    console.log("Delete Recipe Id: ", recipe.id);
  }

  return (
    <div className="bg-gray-900 text-gray-200 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl w-72">
      {/* Recipe Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={recipe.image || "https://via.placeholder.com/300x200"}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-white truncate">
          {recipe.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3">
          {recipe.description || "No description available."}
        </p>

        {/* Action */}
        <Link
            to={`/profile/${recipe.id}`}
            className='text-white'
        >   
            <button className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">

                Edit
            </button>
        </Link>
        
        <button 
          onClick={handleDelete}
          className="mt-3 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition">
          Delete
        </button>
      </div>
    </div>
  );
}
