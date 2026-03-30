import React from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import router from "./router/router";
import { AuthProvider } from "./AuthenticationPage/Authentication";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
