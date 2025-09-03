import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Card from '../components/Card';
import { fetchRecipes } from "../hooks/fetchRecipes";

const Dashboard = () => {
  const {data: recipes, isLoading, isError, error} = fetchRecipes();

  if (isLoading) return <div className="text-gray-400 text-center mt-10">Loading recipe...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;

  return (
      <>
        <Navbar />

        <div className="flex mt-8 mb-4 flex-wrap mx-5 gap-5 justify-center">
          {
            recipes.map((recipe) => (
              <Card 
                key={recipe.id}
                recipe={recipe}
              />
            ))
          }
        </div>
      </>
    );
};

export default Dashboard;
