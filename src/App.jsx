import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import Panel from "./components/Panel";
import SimpleModal from "./components/SimpleModal";
import Context, {
  COMPUTER_PLAY,
  RESTART_GAME,
  COMPUTER_THINK,
  SET_TERRAIN,
} from "./context/HandsContext";
import { getAnimalsInfo, terrains } from "./data/data.jsx";
import { useParams } from "react-router-dom";

function App() {
  let { username } = useParams();
  const [state, dispatch] = useContext(Context);
  const [terrain, setTerrain] = useState("");
  const [userWins, setUserWins] = useState(false);
  const [pcWins, setPcWins] = useState(false);
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  const getLiveCards = (hand) => {
    return hand.filter((card) => card.life.current !== "DEAD");
  };
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
    if (getLiveCards(hands.pc).length === 0) {
      setUserWins(true);
      dispatch({ type: RESTART_GAME });
    }
    if (getLiveCards(hands.user).length === 0) {
      setPcWins(true);
      dispatch({ type: RESTART_GAME });
    }
  }, [hands.pc, hands.user]);

  useEffect(() => {
    if (pcTurn) {
      if (triggerPcAttack) {
        setTimeout(() => {
          dispatch({ type: COMPUTER_PLAY });
        }, 1300);
      } else {
        dispatch({ type: COMPUTER_THINK });
      }
    }
  }, [pcTurn, triggerPcAttack]);

  return (
    <Wrapper bgColor={terrain.color}>
      <LeftPanel>
        <Panel player={"PC"} plants={plants.pc} />
        <Text color={terrain.color}>{terrain.type}</Text>
        <Panel player={username} plants={plants.user} />
      </LeftPanel>
      <Board>
        {userWins && (
          <SimpleModal setShowModal={setUserWins} sign="win" width="60%" />
        )}
        {pcWins && (
          <SimpleModal setShowModal={setPcWins} sign="lose" width="60%" />
        )}
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
  background: (props) => props.bgColor,
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
  position: "relative",
});
const Text = styled.h4({
  textAlign: "center",
  color: (props) => props.color,
});

export default App;
