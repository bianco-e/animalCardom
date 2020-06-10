import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import Panel from "./components/Panel";
import Context, {
  COMPUTER_PLAY,
  RESTART_GAME,
  COMPUTER_THINK,
  SET_TERRAIN,
} from "./context/HandsContext";
import { getAnimalsInfo, terrains } from "./data/data.jsx";

function App() {
  const [state, dispatch] = useContext(Context);
  const [bgColor, setBgColor] = useState("");
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  const setTerrain = () => {
    const randomNum = Math.floor(Math.random() * terrains.length);
    dispatch({
      type: SET_TERRAIN,
      familyToBuff: terrains[randomNum].familyToBuff,
    });
    return terrains[randomNum].color;
  };

  useEffect(() => {
    getAnimalsInfo();
    setBgColor(setTerrain());
  }, []);

  useEffect(() => {
    if (hands.pc.every((card) => card.life === "DEAD")) {
      alert("You win!");
      dispatch({ type: RESTART_GAME });
    }
    if (hands.user.every((card) => card.life === "DEAD")) {
      alert("Computer wins!");
      dispatch({ type: RESTART_GAME });
    }
  }, [hands]);

  // THE useEffect TO ANNOUNCE THE WINNER IS NOT WORKING PROPERLY

  useEffect(() => {
    if (pcTurn) {
      if (triggerPcAttack) {
        setTimeout(() => {
          dispatch({ type: COMPUTER_PLAY });
        }, 1400);
      } else {
        dispatch({ type: COMPUTER_THINK });
      }
    }
  }, [pcTurn, triggerPcAttack]);

  return (
    <Wrapper>
      <LeftPanel>
        <Panel player={"PC"} plants={plants.pc} />
        <Panel player={"USER"} plants={plants.user} />
      </LeftPanel>
      <Board bgColor={bgColor}>
        <Hand arrayToRender={hands.pc} />
        <ComputerMessage>{pcPlay}</ComputerMessage>
        <Hand arrayToRender={hands.user} />
      </Board>
    </Wrapper>
  );
}
const Wrapper = styled.div({
  display: "flex",
  flexStart: "left",
});
const LeftPanel = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#EEE8AA",
  width: "90px",
  border: "2px solid #CD853F",
});
const Board = styled.div({
  display: "flex",
  padding: "0px 10px 0px 10px",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
  width: "100%",
  backgroundColor: (props) => props.bgColor,
});
const ComputerMessage = styled.h4({
  textAlign: "center",
});

export default App;
