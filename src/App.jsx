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
  const [terrain, setTerrain] = useState("");
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  const getTerrain = () => {
    const randomNum = Math.floor(Math.random() * terrains.length);
    dispatch({
      type: SET_TERRAIN,
      familyToBuff: terrains[randomNum].familyToBuff,
    });
    return terrains[randomNum];
  };

  useEffect(() => {
    getAnimalsInfo();
    setTerrain(getTerrain());
  }, []);

  useEffect(() => {
    const getLiveCards = (hand) => {
      return hand.filter((card) => card.life.current !== "DEAD");
    };
    if (getLiveCards(hands.pc).length === 0) {
      alert("You win");
      dispatch({ type: RESTART_GAME });
    }
    if (getLiveCards(hands.user).length === 0) {
      alert("Computer wins");
      dispatch({ type: RESTART_GAME });
    }
  }, [hands.pc, hands.user]);

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
        <Text color={terrain.color} margin={"20px 0px 25px 0px"}>
          {terrain.terrain}
        </Text>
        <Panel player={"USER"} plants={plants.user} />
      </LeftPanel>
      <Board bgColor={terrain.color}>
        <Hand arrayToRender={hands.pc} />
        <Text>{pcPlay}</Text>
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
const Text = styled.h4({
  margin: (props) => props.margin,
  textAlign: "center",
  color: (props) => props.color,
});

export default App;
