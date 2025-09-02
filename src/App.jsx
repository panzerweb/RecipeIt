import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import Signin from "./components/Signin";

import { UserAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  const { user } = UserAuth();

  // console.log(user);

  return (
    <QueryClientProvider client={queryClient}>
      <Signin />
    </QueryClientProvider>
  );
}

export default App;
