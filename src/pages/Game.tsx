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
  COMPUTER_THINK,
  SET_CARDS,
} from "../context/HandsContext/types";
import SidePanel from "../components/GamePanel";
import { IAnimal, IPlant, ITerrain } from "../interfaces";
import { getUserMe } from "../queries/user";
import { newTerrain, newCampaignGame, newRandomGame } from "../queries/games";
import Spinner from "../components/Spinner";
import ModalResultContent from "../components/ModalResultContent";
import { getCookie } from "../utils";

const emptyTerrain = {
  name: "",
  color: "#fff",
  speciesToBuff: "",
  image: "",
};

export default function App() {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext);
  const [isCampaignGame, setIsCampaignGame] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [terrain, setTerrain] = useState<ITerrain>(emptyTerrain);
  const [modal, setModal] = useState<string>("");
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { hands, plants, pcTurn, pcPlay, triggerPcAttack } = state;

  interface Response {
    user: { animals: IAnimal[]; plants: IPlant[] };
    pc: { animals: IAnimal[]; plants: IPlant[] };
  }

  const newGameResHandler = (terrain: ITerrain, res?: Response) => {
    setIsLoading(false);
    if (res && res.user && res.pc) {
      dispatch({
        type: SET_CARDS,
        hands: { pc: res.pc.animals, user: res.user.animals },
        plants: { pc: res.pc.plants, user: res.user.plants },
        terrain,
      });
    }
  };

  const checkUserAndStartGame = () => {
    setIsLoading(true);
    if (!pathname.startsWith("/game")) {
      // is game for guests
      const guest = localStorage.getItem("guest");
      guest ? setUserName(guest) : history.push("/");
      newTerrain().then((terrainRes) => {
        if (terrainRes && terrainRes.name) {
          setTerrain(terrainRes);
          newRandomGame().then((res) => newGameResHandler(terrainRes, res));
        }
      });
    } else {
      // is campaign game
      setIsCampaignGame(true);
      const authId = getCookie("auth=");
      if (authId) {
        getUserMe(authId).then((userRes) => {
          if (
            userRes &&
            userRes.xp !== undefined &&
            userRes.owned_cards &&
            userRes.first_name
          ) {
            setUserName(userRes.first_name);
            const { owned_cards, xp } = userRes;
            const [, xpParam] = search.split("?x=");
            if (parseInt(xpParam) === xp) {
              newTerrain(xp).then((terrainRes) => {
                if (terrainRes && terrainRes.name) {
                  newCampaignGame(xp, owned_cards).then((gameRes) =>
                    newGameResHandler(terrainRes.speciesToBuff, gameRes)
                  );
                  setTerrain(terrainRes);
                }
              });
            } else history.push("/menu");
          }
        });
      }
    }
  };

  const getLiveCards = (hand: IAnimal[]) => {
    console.log(hand.filter((card) => card.life.current !== "DEAD"));
    return hand.filter((card) => card.life.current !== "DEAD");
  };

  useEffect(() => {
    checkUserAndStartGame();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (hands.pc.length && hands.user.length) {
      if (getLiveCards(hands.user).length === 0) {
        setModal("lose");
      }
      if (getLiveCards(hands.pc).length === 0) {
        setModal("win");
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
          {modal && (
            <CustomModal closeModal={() => {}} withCloseButton={false}>
              <ModalResultContent
                closeModal={() => setModal("")}
                modal={modal}
                isCampaignGame={isCampaignGame}
                setTerrain={setTerrain}
              />
            </CustomModal>
          )}
          <Hand hand={hands.pc} belongsToUser={false} />
          <BoardText>{pcPlay}</BoardText>
          <Hand hand={hands.user} belongsToUser={true} />
        </Board>
      </Wrapper>
      {isLoading && (
        <CustomModal closeModal={() => setIsLoading(false)} forSpinner={true}>
          <Spinner />
        </CustomModal>
      )}
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
const BoardText = styled.h4`
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
