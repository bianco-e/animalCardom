import React, { useState } from "react";
import { tenCards } from "./data/data.jsx";
import styled from "styled-components";
import FiveCards from "./components/FiveCards";

function App() {
  const [clicked, setClicked] = useState(false);
  const computerHand = tenCards.computerCards;
  const userHand = tenCards.userCards;

  return (
    <Wrapper>
      <FiveCards
        arrayToRender={computerHand}
        clicked={clicked}
        setClicked={setClicked}
      />
      <FiveCards
        arrayToRender={userHand}
        clicked={clicked}
        setClicked={setClicked}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  padding: "0",
});

export default App;
