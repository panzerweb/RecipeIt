import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Create from "../components/Create";

const Dashboard = () => {
  const [recipes, setRecipes] = useState(null);
  return (
    <>
      <Navbar />

      <Create />
    </>
  );
};

export default Dashboard;
