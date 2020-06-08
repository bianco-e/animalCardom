import React, { useState, useContext } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import Context from "./context/HandsContext";
import { getAnimalsInfo } from "./data/data.jsx";

getAnimalsInfo();

function App() {
  const [clicked, setClicked] = useState(false);
  const [pcPlay, setPcPlay] = useState("");
  const { hands, setHands } = useContext(Context);
  return (
    <Wrapper>
      <Hand
        arrayToRender={hands.pc}
        clicked={clicked}
        setClicked={setClicked}
        setPcPlay={setPcPlay}
      />
      <ComputerMessage>{pcPlay}</ComputerMessage>
      <Hand
        arrayToRender={hands.user}
        clicked={clicked}
        setClicked={setClicked}
        setPcPlay={setPcPlay}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
});
const ComputerMessage = styled.h4({
  textAlign: "center",
});

export default App;
