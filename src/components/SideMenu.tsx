import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  ACButton,
  ComingSoon,
  LogButton,
} from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";

interface IProps {
  username: string;
}

export default function SideMenu({ username }: IProps) {
  const { logout } = useAuth0();
  const history = useHistory();
  const handleCampaign = () => history.push("/campaign");
  const handleProfile = () => history.push("/profile");
  const handleCollection = () => history.push("/collection");
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <Wrapper>
      <img
        alt="ac-logo"
        src="/images/animal-cardom-logo.png"
        width={60}
        onClick={() => history.push("/menu")}
      />
      {username ? (
        <Title>
          Hi, <b>{username}</b>
        </Title>
      ) : (
        <AnimatedPlaceholder />
      )}
      <ACButton fWeight="bold" onClick={handleProfile}>
        Profile
      </ACButton>
      <ACButton fWeight="bold" onClick={handleCollection}>
        Collection
      </ACButton>
      <ACButton fWeight="bold" onClick={handleCampaign}>
        Campaign
      </ACButton>
      <ACButton disabled fWeight="bold">
        <ComingSoon>Coming soon!</ComingSoon>
        PvP
      </ACButton>
      <LogButton onClick={handleLogout}>Log out</LogButton>
    </Wrapper>
  );
}

const Title = styled.span`
  font-size: 20px;
`;

const Wrapper = styled.div`
  align-items: center;
  background: rgba(185, 147, 90, 0.1);
  box-shadow: 0 0 5px 5px rgba(95, 57, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  left: 0;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 250px;
  > img {
    &:first-child {
      cursor: pointer;
      margin-top: 60px;
    }
  }
  > button {
    &:last-child {
      margin-bottom: 60px;
    }
  }
`;
