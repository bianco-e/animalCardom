import React from "react";
import Router from "./Router";
import { HandsContext } from "./context/HandsContext";
import AuthProvider from "./0auth/Provider";

const Main = () => {
  return (
    <AuthProvider>
      <HandsContext>
        <Router></Router>
      </HandsContext>
    </AuthProvider>
  );
};

export default Main;
