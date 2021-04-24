import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Hand from "../components/Hand";
import CustomModal from "../components/CustomModal";
import { useLocation, useHistory } from "react-router-dom";
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
  SET_CARDS,
} from "../context/HandsContext/types";
import SidePanel from "../components/SidePanel";
import { IAnimal, IPlant, ITerrain } from "../interfaces";
import { getUserMe } from "../queries/user";
import { newTerrain, newCampaignGame, newRandomGame } from "../queries/games";

const emptyTerrain = {
  name: "",
  color: "#fff",
  speciesToBuff: "",
  image: "",
};

export default function App() {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext);
  const [isLoading, setIsLoading] = useState<string>("loading");
  const [userName, setUserName] = useState<string>("");
  const [terrain, setTerrain] = useState<ITerrain>(emptyTerrain);
  const [modalSign, setModalSign] = useState<any>("");
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  const newGameResHandler = (res?: {
    user: { animals: IAnimal[]; plants: IPlant[] };
    pc: { animals: IAnimal[]; plants: IPlant[] };
  }) => {
    setIsLoading("");
    if (res && res.user && res.pc) {
      dispatch({
        type: SET_CARDS,
        hands: { pc: res.pc.animals, user: res.user.animals },
        plants: { pc: res.pc.plants, user: res.user.plants },
      });
    }
  };

  const checkUserAndStartGame = () => {
    setIsLoading("loading");
    if (!pathname.startsWith("/game")) {
      // is game for guests
      const guest = localStorage.getItem("guest");
      guest ? setUserName(guest) : history.push("/");
      newTerrain().then((res) => {
        if (res && res.name) {
          setTerrain(res);
          newRandomGame().then((res) => newGameResHandler(res));
          dispatch({
            type: SET_TERRAIN,
            speciesToBuff: res.speciesToBuff,
          });
        }
      });
    } else {
      // is campaign game
      const [, authId] = document.cookie.split("auth=");
      if (authId) {
        getUserMe(authId).then((res) => {
          if (res && res.profile && res.owned_cards && res.first_name) {
            setUserName(res.first_name);
            const { owned_cards, profile } = res;
            const { campaign_level } = profile;
            const [, level] = search.split("?lv=");
            if (parseFloat(level) === campaign_level) {
              newTerrain(campaign_level).then((res) => {
                if (res && res.name) {
                  newCampaignGame(campaign_level, owned_cards).then((res) =>
                    newGameResHandler(res)
                  );
                  setTerrain(res);
                  dispatch({
                    type: SET_TERRAIN,
                    speciesToBuff: res.speciesToBuff,
                  });
                }
              });
            } else history.push("/menu");
          }
        });
      }
    }
  };

  const getLiveCards = (hand: IAnimal[]) => {
    return hand.filter((card) => card.life.current !== "DEAD");
  };

  useEffect(() => {
    checkUserAndStartGame();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (hands.pc.length && hands.user.length) {
      if (getLiveCards(hands.pc).length === 0) {
        setModalSign("win");
        dispatch({ type: RESTART_GAME });
      }
      if (getLiveCards(hands.user).length === 0) {
        setModalSign("lose");
        dispatch({ type: RESTART_GAME });
      }
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
    <>
      <Wrapper bgImg={terrain!.image}>
        <SidePanel plants={plants} terrain={terrain!} userName={userName} />
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
      {isLoading && <CustomModal setShowModal={setIsLoading} sign="loading" />}
    </>
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
