import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./routes/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Favorites from "./routes/Favorites";
import NewRecipe from "./routes/NewRecipe";
import { Profile } from "./routes/Profile";
import { UpdateRecipe } from "./components/updateRecipe";
import { RecipeItem } from "./components/RecipeItem";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/favorites",
    element: (
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    )
  },
  {
    path: "/newrecipe",
    element: (
      <PrivateRoute>
        <NewRecipe />
      </PrivateRoute>
    )
  },
  {
    path: "/dashboard/:id",
    element: (
      <PrivateRoute>
        <RecipeItem />
      </PrivateRoute>
    )
  },
  {
    path: "/profile/:id",
    element: (
      <PrivateRoute>
        <UpdateRecipe />
      </PrivateRoute>
    )
  }
]);
