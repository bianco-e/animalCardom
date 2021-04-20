import React from "react";
import Router from "./Router";
import { UserContext } from "./context/UserContext";
import { HandsContext } from "./context/HandsContext";

const Main = () => {
  return (
    <UserContext>
      <HandsContext>
        <Router></Router>
      </HandsContext>
    </UserContext>
  );
};

export default Main;
