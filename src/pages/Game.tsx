import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "../components/Hand";
import CustomModal from "../components/CustomModal";
import {
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../utils/constants";
import HandsContext, { IHandsContext } from "../context/HandsContext";
import {
  COMPUTER_PLAY,
  RESTART_GAME,
  COMPUTER_THINK,
  SET_TERRAIN,
} from "../context/HandsContext/types";
import { terrains } from "../data/data";
import SidePanel from "../components/SidePanel";
import { IAnimal, ITerrain } from "../interfaces";

const emptyTerrain = {
  name: "",
  color: "#fff",
  speciesToBuff: "",
  image: "",
};

export default function App() {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext);
  const [terrain, setTerrain] = useState<ITerrain>(emptyTerrain);
  const [modalSign, setModalSign] = useState<any>("");
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  const getLiveCards = (hand: IAnimal[]) => {
    return hand.filter((card) => card.life.current !== "DEAD");
  };
  const getTerrain = () => {
    const randomNum = Math.floor(Math.random() * terrains.length);
    dispatch({
      type: SET_TERRAIN,
      speciesToBuff: terrains[randomNum].speciesToBuff,
    });
    return terrains[randomNum];
  };

  useEffect(() => {
    setTerrain(getTerrain());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (getLiveCards(hands.pc).length === 0) {
      setModalSign("win");
      dispatch({ type: RESTART_GAME });
    }
    if (getLiveCards(hands.user).length === 0) {
      setModalSign("lose");
      dispatch({ type: RESTART_GAME });
    }
  }, [hands.pc, hands.user]); //eslint-disable-line

  useEffect(() => {
    if (pcTurn) {
      if (triggerPcAttack) {
        setTimeout(() => {
          dispatch({ type: COMPUTER_PLAY });
        }, 1800);
      } else {
        dispatch({ type: COMPUTER_THINK });
      }
    }
  }, [pcTurn, triggerPcAttack]); //eslint-disable-line

  return (
    <Wrapper bgImg={terrain!.image}>
      <SidePanel plants={plants} terrain={terrain!} />
      <Board>
        {modalSign && (
          <CustomModal setShowModal={setModalSign} sign={modalSign} />
        )}
        {modalSign && (
          <CustomModal setShowModal={setModalSign} sign={modalSign} />
        )}
        <Hand hand={hands.pc} belongsToUser={false} />
        <Text>{pcPlay}</Text>
        <Hand hand={hands.user} belongsToUser={true} />
      </Board>
    </Wrapper>
  );
}

interface WrapperProps {
  bgImg?: string;
}
const Wrapper = styled.div`
  background: url(${(p: WrapperProps) => p.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-start: left;
  height: 100vh;
  width: 100%;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    flex-direction: column;
  }
`;
const Board = styled.div`
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
