import React, { useState } from "react";
import { getCards } from "../data/data.jsx";

const Context = React.createContext({});

export const HandsContext = ({ children }) => {
  const [hands, setHands] = useState(getCards());
  const [pcTurn, setPcTurn] = useState(false);

  /* const reducer = (state, action) => {
    switch (action.type) {
      case "announceWinner":
        return alert("winner");
      case "changeTurn":
        return setTurn(!pcTurn);
      default:
        break;
    }
  }; */

  return (
    <Context.Provider value={{ hands, setHands, pcTurn, setPcTurn }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
