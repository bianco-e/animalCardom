import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import {
  ACButton,
  ComingSoon,
  LogButton,
} from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";
import { getCurrentSection } from "../utils";

interface IProps {
  username: string;
}

export default function SideMenu({ username }: IProps) {
  const [currentSection, setCurrentSection] = useState<string>();
  const { logout } = useAuth0();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setCurrentSection(getCurrentSection(location.pathname));
  }, [location.pathname]);
  const buttonsData = [
    {
      title: "Profile",
      fn: () => history.push("/profile"),
    },
    {
      title: "Collection",
      fn: () => history.push("/collection"),
    },
    {
      title: "Campaign",
      fn: () => history.push("/campaign"),
    },
  ];
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
      {buttonsData.map(({ title, fn }) => {
        const isSelected = currentSection === title;
        return (
          <ACButton
            key={title}
            fWeight="bold"
            onClick={fn}
            selected={isSelected}
          >
            {title}
          </ACButton>
        );
      })}
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
