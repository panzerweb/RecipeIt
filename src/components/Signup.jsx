import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser(displayName, email, password); // Call context function

      if (result.success) {
        navigate("/dashboard"); // Navigate to dashboard on success
      } else {
        setError(result.error.message); // Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
        <h1 className="text-center font-bold">RecipeIt</h1>
        <h2 className="font-bold pb-2">Sign up for free!</h2>

        <div className="flex flex-col py-4">
          {/* <label htmlFor="Display_Name">Display Name</label> */}
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-3 mt-2 rounded-md"
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Display Name"
          />
        </div>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Email">Email</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Password">Password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2 rounded-md"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <p className="text-center text-sm">
          Already have an account? <Link to="/">Sign in</Link>
        </p>

        <button type="submit" disabled={loading} className="w-full mt-4">
          Sign Up
        </button>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
