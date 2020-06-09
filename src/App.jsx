import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import Context, {
  COMPUTER_PLAY,
  RESTART_GAME,
  COMPUTER_THINK,
} from "./context/HandsContext";
import { getAnimalsInfo } from "./data/data.jsx";

getAnimalsInfo();

function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.hands.pc.every((card) => card.life === "DEAD")) {
      alert("You win!");
      dispatch({ type: RESTART_GAME });
    }
    if (state.hands.user.every((card) => card.life === "DEAD")) {
      alert("Computer wins!");
      dispatch({ type: RESTART_GAME });
    }
  }, [state.hands]);

  useEffect(() => {
    if (state.pcTurn) {
      if (state.triggerPcAttack) {
        setTimeout(() => {
          dispatch({ type: COMPUTER_PLAY });
        }, 1400);
      } else {
        dispatch({ type: COMPUTER_THINK });
      }
    }
  }, [state.pcTurn, state.triggerPcAttack]);

  return (
    <Wrapper>
      <Hand arrayToRender={state.hands.pc} />
      <ComputerMessage>{state.pcPlay}</ComputerMessage>
      <Hand arrayToRender={state.hands.user} />
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
