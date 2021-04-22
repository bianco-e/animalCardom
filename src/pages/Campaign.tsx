import React from "react";
import styled from "styled-components";
import CampaignCircuit from "../components/CampaignCircuit";
import CampaignProgress from "../components/CampaignProgress";
import MenuLayout from "../components/MenuLayout";

export default function Campaign() {
  const userCampaignLevel = 2;
  return (
    <MenuLayout>
      <>
        <CampaignProgress userCampaignLevel={userCampaignLevel} />
        <CampaignCircuit userCampaignLevel={userCampaignLevel} />
      </>
    </MenuLayout>
  );
}

const Wrapper = styled.div``;
