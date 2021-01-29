import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import SimpleModal from "./components/SimpleModal";
import { LARGE_RESPONSIVE_BREAK } from "./lib/constants";
import Context, {
  COMPUTER_PLAY,
  RESTART_GAME,
  COMPUTER_THINK,
  SET_TERRAIN,
} from "./context/HandsContext";
import { getAnimalsInfo, terrains } from "./data/data.jsx";
import { useParams } from "react-router-dom";
import SidePanel from "./components/SidePanel";

export default function App() {
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
      <SidePanel plants={plants} terrain={terrain} username={username} />
      <Board>
        {userWins && (
          <SimpleModal setShowModal={setUserWins} sign="win" width="60%" />
        )}
        {pcWins && (
          <SimpleModal setShowModal={setPcWins} sign="lose" width="60%" />
        )}
        <Hand arrayToRender={hands.pc} />
        <Caster>
          <Text>{pcPlay}</Text>
        </Caster>
        <Hand arrayToRender={hands.user} />
      </Board>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-start: left;
  background-color: ${({ bgColor }) => bgColor};
  height: 100vh;
  min-width: 1100px;
  width: 100%;
  @media (${LARGE_RESPONSIVE_BREAK}) {
    min-width: 850px;
  }
`;
const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  position: relative;
  width: 100%;
`;
const Caster = styled.div`
  align-items: center;
  display: flex;
  height: 65px;
  justify-content: center;
`;
const Text = styled.h4`
  align-items: center;
  color: ${({ color }) => color};
  display: flex;
  height: 33%;
  justify-content: center;
  text-align: center;
  @media (${LARGE_RESPONSIVE_BREAK}) {
    margin-top: 35px;
  }
`;
