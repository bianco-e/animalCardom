import { useEffect, useState } from "react";
import MenuLayout from "../components/MenuLayout";
import AvatarWithXpBar from "../components/AvatarWithXpBar";
import History from "../components/History";
import { getLastGames, getUserProfile } from "../queries/user";
import { Game } from "../interfaces";
import Spinner from "../components/Spinner";
import { getCookie } from "../utils";
import AccordionSection from "../components/AccordionSection";

export default function Profile() {
  const [lastGames, setLastGames] = useState<Game[]>([]);
  const [isLoadingLastGames, setIsLoadingLastGames] = useState<boolean>(false);
  const [havingXp, setHavingXp] = useState<number>(0);

  useEffect(() => {
    const authId = getCookie("auth=");
    if (authId) {
      setIsLoadingLastGames(true);
      getUserProfile(authId).then((res) => {
        if (res && res.xp) {
          setHavingXp(res.xp);
        }
      });
      getLastGames(authId).then((res) => {
        setIsLoadingLastGames(false);
        if (res) {
          setLastGames(res);
        }
      });
    }
  }, []);

  return (
    <MenuLayout>
      <>
        <AvatarWithXpBar havingXp={havingXp} />
        <AccordionSection title="History">
          {isLoadingLastGames ? <Spinner /> : <History lastGames={lastGames} />}
        </AccordionSection>
      </>
    </MenuLayout>
  );
}
