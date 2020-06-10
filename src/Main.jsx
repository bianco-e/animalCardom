import React from "react";
import App from "./App";
import { HandsContext } from "./context/HandsContext";

const Main = () => {
  return (
    <HandsContext>
      <App></App>
    </HandsContext>
  );
};

export default Main;
