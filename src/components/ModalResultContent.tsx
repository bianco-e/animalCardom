import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HandsContext, { IHandsContext } from "../context/HandsContext";
import { SET_CARDS } from "../context/HandsContext/types";
import { ITerrain } from "../interfaces";
import { newRandomGame, newTerrain } from "../queries/games";
import { getUserProfile } from "../queries/user";
import AvatarWithXpBar from "./AvatarWithXpBar";
import Spinner from "./Spinner";
import { ACButton, ModalTitle, Text } from "./styled-components";

interface IProps {
  closeModal: () => void;
  isCampaignGame: boolean;
  modal: string;
  setTerrain: (terrain: ITerrain) => void;
}
export default function ModalResultContent({
  closeModal,
  isCampaignGame,
  modal,
  setTerrain,
}: IProps) {
  const [state, dispatch] = useContext<IHandsContext>(HandsContext);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isLoadingNewGame, setisLoadingNewGame] = useState<boolean>(false);
  const [havingXp, setHavingXp] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    const [, authId] = document.cookie.split("auth=");
    if (isCampaignGame && authId) {
      setIsLoadingProfile(true);
      getUserProfile(authId).then((res) => {
        setIsLoadingProfile(false);
        if (res && res.profile) {
          setHavingXp(res.profile.xp);
        }
      });
    }
  }, []);

  const handlePlayAgain = () => {
    setisLoadingNewGame(true);
    newTerrain().then((terrainRes) => {
      if (terrainRes && terrainRes.name) {
        setTerrain(terrainRes);
        newRandomGame().then((gameRes) => {
          if (gameRes && gameRes.pc && gameRes.user) {
            setisLoadingNewGame(false);
            closeModal();
            dispatch({
              type: SET_CARDS,
              hands: { pc: gameRes.pc.animals, user: gameRes.user.animals },
              plants: { pc: gameRes.pc.plants, user: gameRes.user.plants },
              speciesToBuff: terrainRes.speciesToBuff,
            });
          }
        });
      }
    });
  };

  const handleRoute = (path: string) => history.push(path);

  return (
    <>
      {modal === "win" ? (
        <>
          <ModalTitle>You won!</ModalTitle>
          <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
            Good game! Nature always win against computers!
          </Text>
          {isCampaignGame ? (
            <>
              <AvatarWithXpBar havingXp={havingXp} />
              <ACButton
                margin="20px 0"
                onClick={() => handleRoute("/campaign")}
              >
                Go to campaign menu
              </ACButton>
            </>
          ) : (
            <>
              {isLoadingNewGame ? (
                <Spinner />
              ) : (
                <>
                  <ACButton margin="10px 0 5px 0" onClick={handlePlayAgain}>
                    Play again
                  </ACButton>
                  <ACButton margin="5px 0" onClick={() => handleRoute("/")}>
                    Go to menu
                  </ACButton>
                </>
              )}
            </>
          )}
        </>
      ) : (
        modal === "lose" && (
          <>
            <ModalTitle>You lost!</ModalTitle>
            <Text margin={isCampaignGame ? "0 0 20px 0" : "0"}>
              Nice try! PC defeated you this time, but nature always takes
              revenge!
            </Text>
            {isCampaignGame ? (
              <>
                <AvatarWithXpBar havingXp={havingXp} />
                <ACButton
                  margin="20px 0"
                  onClick={() => handleRoute("/campaign")}
                >
                  Go to campaign menu
                </ACButton>
              </>
            ) : (
              <>
                <ACButton margin="10px 0 5px 0" onClick={handlePlayAgain}>
                  Play again
                </ACButton>
                <ACButton margin="5px 0" onClick={() => handleRoute("/")}>
                  Go to menu
                </ACButton>
              </>
            )}
          </>
        )
      )}
    </>
  );
}
