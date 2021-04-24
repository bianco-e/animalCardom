import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CampaignCircuit from "../components/CampaignCircuit";
import CampaignProgress from "../components/CampaignProgress";
import MenuLayout from "../components/MenuLayout";
import Spinner from "../components/Spinner";
import { getUserProfile } from "../queries/user";

export default function Campaign() {
  const [userCampaignLevel, setuserCampaignLevel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const [, authId] = document.cookie.split("auth=");
    if (authId) {
      setIsLoading(true);
      getUserProfile(authId).then((res) => {
        setIsLoading(false);
        if (res && res.profile) {
          const { campaign_level } = res.profile;
          setuserCampaignLevel(campaign_level);
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
            <CampaignProgress userCampaignLevel={userCampaignLevel} />
            <CampaignCircuit userCampaignLevel={userCampaignLevel} />
          </>
        )}
      </>
    </MenuLayout>
  );
}

const Wrapper = styled.div``;
