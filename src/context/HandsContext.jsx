import React, { useState } from "react";
import { getTenCards } from "../data/data.jsx";

const Context = React.createContext({});

export const HandsContext = ({ children }) => {
  const [hands, setHands] = useState(getTenCards());

  return (
    <Context.Provider value={{ hands, setHands }}>{children}</Context.Provider>
  );
};

export default Context;
