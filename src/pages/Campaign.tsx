import React, { useEffect, useState } from "react";
import CampaignCircuit from "../components/CampaignCircuit";
import CampaignProgress from "../components/CampaignProgress";
import MenuLayout from "../components/MenuLayout";
import Spinner from "../components/Spinner";
import { getUserProfile } from "../queries/user";
import { getCookie } from "../utils";

export default function Campaign() {
  const [havingXp, sethavingXp] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const authId = getCookie("auth=");
    if (authId) {
      setIsLoading(true);
      getUserProfile(authId).then((res) => {
        setIsLoading(false);
        if (res && res.xp) {
          console.log("current xp", res.xp);
          sethavingXp(res.xp);
        }
      });
    }
  }, []);

  return (
    <MenuLayout>
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CampaignProgress xp={havingXp} />
            <CampaignCircuit xp={havingXp} />
          </>
        )}
      </>
    </MenuLayout>
  );
}
