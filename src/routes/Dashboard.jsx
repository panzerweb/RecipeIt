import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Create from "../components/Create";
import Card from '../components/Card';
import { useEffect } from "react";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const {data, error} = await supabase
        .from('recipe')
        .select()

      if (error) {
        setFetchError(`Error loading recipes: ${error.message}`);
        setRecipes([])
      }else{
        setRecipes(data);
        setFetchError(null)
        console.log(data);
      }
    }
    fetchRecipes();
  }, [])

  return (
      <>
        <Navbar />

        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

        <div className="flex mt-8 mb-4 flex-wrap mx-5 gap-5 justify-center">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Card 
                key={recipe.id}
                recipe={recipe}
              />
            ))
          ) : (
            !fetchError && <p>No recipes found.</p>
          )}
        </div>

        {/* <Create /> */}
      </>
    );
};

export default Dashboard;
