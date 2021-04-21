import React from "react";
import Router from "./Router";
import { UserContext } from "./context/UserContext";
import { HandsContext } from "./context/HandsContext";
import AuthProvider from "./0auth/Provider";

const Main = () => {
  return (
    <AuthProvider>
      <UserContext>
        <HandsContext>
          <Router></Router>
        </HandsContext>
      </UserContext>
    </AuthProvider>
  );
};

export default Main;
