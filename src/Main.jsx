import React from "react";
import MainRouter from "./MainRouter";
import { HandsContext } from "./context/HandsContext";

const Main = () => {
  return (
    <HandsContext>
      <MainRouter></MainRouter>
    </HandsContext>
  );
};

export default Main;
