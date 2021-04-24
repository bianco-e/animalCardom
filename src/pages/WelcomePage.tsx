import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CustomModal from "../components/CustomModal";
import NavBar from "../components/NavBar";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import { ACButton, ComingSoon, Text } from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";

export default function WelcomePage() {
  const { user, isAuthenticated } = useAuth0();
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>("");
  const [modal, setModal] = useState<string>("");

  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setModal("mobileDetected");
    }
  };

  useEffect(() => {
    isMobile();
  }, []);

  const goToPlay = () => {
    if (inputValue !== "") {
      localStorage.setItem("guest", inputValue);
      history.push(`/play`);
      setInputValue("");
    } else {
      setModal("nameError");
    }
  };

  const onKeyDownFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToPlay();
    }
  };

  const getModalContent = (modal: string) => {
    if (modal === "nameError") {
      return (
        <>
          <Title>Nameless people are not allowed in Animal Cardom!</Title>
          <Text>Please enter a name and try to play again</Text>
        </>
      );
    }
    if (modal === "mobileDetected") {
      return (
        <>
          <Title>Mobile device detected</Title>
          <Text>
            You could be using Animal Cardom from a mobile device. In that case,
            we recommend to rotate the screen for a better experience
          </Text>
        </>
      );
    }
    if (modal === "rules") {
      return (
        <>
          <Title>Animal Cardom rules</Title>
          <Text>
            You have five different animals cards, and three different plants to
            apply on them if wanted. A terrain will be randomly set at the very
            start. Each card has an ability, an attack and life points, and also
            belongs to a species which can give you benefits or not depending on
            the terrain or other cards' abilities. The objective is to kill all
            opponent's cards. Have fun!
          </Text>
        </>
      );
    }
    if (modal === "terrains") {
      return (
        <>
          <Title>Available terrains</Title>
          There are 6 different terrains. One is randomly set when game begins
          and benefits a species increasing attack by 1
          {[
            "- Sea buffs 🦈 animals",
            "- Swamp buffs 🐸 animals",
            "- Jungle buffs 🐺 animals",
            "- Desert buffs 🦂 animals",
            "- Mountain buffs 🦅 animals",
            "- Forest buffs 🦎 animals",
          ].map((text) => (
            <Text>{text}</Text>
          ))}
        </>
      );
    }
  };

  return (
    <Wrapper>
      <NavBar
        isAuthenticated={isAuthenticated}
        username={user && user.given_name && user.given_name}
      />
      <Title>Welcome to Animal Cardom!</Title>
      {modal && (
        <CustomModal closeModal={() => setModal("")}>
          {getModalContent(modal)}
        </CustomModal>
      )}
      <Container>
        <Input
          type="text"
          placeholder="Enter your name to play as guest"
          value={inputValue}
          onChange={(e) =>
            e.target.value.length < 8 && setInputValue(e.target.value)
          }
          onKeyDown={onKeyDownFn}
        />
        <ACButton fWeight="bold" onClick={goToPlay}>
          Play as guest
        </ACButton>
        <ACButton disabled fWeight="bold" onClick={() => {}}>
          <ComingSoon>Coming soon!</ComingSoon>
          PvP
        </ACButton>
        <ACButton onClick={() => setModal("rules")}>Rules</ACButton>
        <ACButton onClick={() => setModal("terrains")}>See Terrains</ACButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-background.png);
  background-repeat: round;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
`;
const Title = styled.h4`
  font-size: 30px;
  text-align: center;
  padding-top: 60px;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 24px;
    padding-top: 30px;
  }
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: space-around;
  margin: auto;
  width: 40%;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    width: 85%;
  }
`;
const Input = styled.input`
  background: #d4a257;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  font-size: 18px;
  height: 30px;
  margin-bottom: 40px;
  padding: 6px 10px;
  text-align: center;
  width: 96%;
  &:focus {
    background: #b9935a;
  }
  &::placeholder {
    color: #000;
  }
`;
