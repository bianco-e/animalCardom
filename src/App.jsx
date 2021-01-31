import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "./components/Hand";
import SimpleModal from "./components/SimpleModal";
import {
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "./lib/constants";
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
  }, []); //eslint-disable-line

  useEffect(() => {
    if (getLiveCards(hands.pc).length === 0) {
      setUserWins(true);
      dispatch({ type: RESTART_GAME });
    }
    if (getLiveCards(hands.user).length === 0) {
      setPcWins(true);
      dispatch({ type: RESTART_GAME });
    }
  }, [hands.pc, hands.user]); //eslint-disable-line

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
  }, [pcTurn, triggerPcAttack]); //eslint-disable-line

  return (
    <Wrapper bgColor={terrain.color}>
      <SidePanel plants={plants} terrain={terrain} username={username} />
      <Board bgColor={terrain.color}>
        {userWins && (
          <SimpleModal setShowModal={setUserWins} sign="win" width="60%" />
        )}
        {pcWins && (
          <SimpleModal setShowModal={setPcWins} sign="lose" width="60%" />
        )}
        <Hand arrayToRender={hands.pc} />
        <Text>{pcPlay}</Text>
        <Hand arrayToRender={hands.user} belongsToUser />
      </Board>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-start: left;
  background: repeating-linear-gradient(
    -45deg,
    ${({ bgColor }) => bgColor} 3px,
    #444 25px,
    #444 25px,
    ${({ bgColor }) => bgColor} 12px
  );
  height: 100vh;
  width: 100%;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    flex-direction: column;
  }
`;
const Board = styled.div`
  background: repeating-linear-gradient(
    -45deg,
    ${({ bgColor }) => bgColor} 3px,
    #444 25px,
    #444 25px,
    ${({ bgColor }) => bgColor} 12px
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 10px;
  position: relative;
  width: 100%;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    padding: 21px 0 0 0;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    min-height: 285px;
  }
`;
const Text = styled.h4`
  align-items: center;
  border-radius: 5px;
  color: ${({ color }) => color};
  display: flex;
  font-sie: 16px;
  height: 45px;
  justify-content: center;
  margin: 0;
  text-shadow: rgba(255, 255, 255, 0.6) 0px 1px 5px;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    font-size: 14px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 12px;
  }
`;
