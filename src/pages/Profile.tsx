import React, { useEffect, useState } from "react";
import { MenuTitle } from "../components/styled-components";
import MenuLayout from "../components/MenuLayout";
import AvatarWithXpBar from "../components/AvatarWithXpBar";
import History from "../components/History";
import { getLastGames, getUserProfile } from "../queries/user";
import { Game } from "../interfaces";
import Spinner from "../components/Spinner";

export default function Profile() {
  const [havingXp, setHavingXp] = useState<number>(0);
  const [lastGames, setLastGames] = useState<Game[]>([]);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [isLoadingLastGames, setIsLoadingLastGames] = useState<boolean>(false);

  useEffect(() => {
    const [, authId] = document.cookie.split("auth=");
    if (authId) {
      setIsLoadingAvatar(true);
      setIsLoadingLastGames(true);
      getUserProfile(authId).then((res) => {
        setIsLoadingLastGames(false);
        if (res && res.profile) {
          const { xp } = res.profile;
          setHavingXp(xp);
        }
      });
      getLastGames(authId).then((res) => {
        setIsLoadingAvatar(false);
        if (res && res.games) {
          const { games } = res;
          setLastGames(games);
        }
      });
    }
  }, []);

  return (
    <MenuLayout>
      <>
        {isLoadingAvatar ? (
          <Spinner />
        ) : (
          <AvatarWithXpBar havingXp={havingXp} />
        )}
        <MenuTitle>History</MenuTitle>
        {isLoadingLastGames ? <Spinner /> : <History lastGames={lastGames} />}
      </>
    </MenuLayout>
  );
}
