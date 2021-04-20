import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SimpleModal from "../components/SimpleModal";
import NavBar from "../components/NavBar";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import UserContext, { IUserContext } from "../context/UserContext";
import { SET_USERNAME } from "../context/UserContext/types";

export default function WelcomePage() {
  const history = useHistory();
  const [state, dispatch] = useContext<IUserContext>(UserContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [modalSign, setModalSign] = useState<any>("");

  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setModalSign("device");
    }
  };

  useEffect(() => {
    isMobile();
  }, []);

  const goToPlay = () => {
    if (inputValue !== "") {
      dispatch({ type: SET_USERNAME, payload: inputValue });
      localStorage.setItem("username", inputValue);
      history.push(`/play`);
      setInputValue("");
    } else {
      setModalSign("nameError");
    }
  };

  const onKeyDownFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToPlay();
    }
  };

  return (
    <Wrapper>
      <NavBar />
      <Title>Welcome to Animal Cardom!</Title>
      {modalSign && (
        <SimpleModal setShowModal={setModalSign} sign={modalSign} />
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
        <Button fWeight="bold" onClick={goToPlay}>
          Campaign
        </Button>
        <Button disabled fWeight="bold" onClick={() => {}}>
          <ComingSoon>Coming soon!</ComingSoon>
          PvP
        </Button>
        <Button onClick={() => setModalSign("rules")}>Rules</Button>
        <Button onClick={() => setModalSign("terrains")}>See Terrains</Button>
      </Container>
    </Wrapper>
  );
}

interface ButtonProps {
  fWeight?: string;
}
const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-cardom.png);
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
const ComingSoon = styled.span`
  background: #000;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
  padding: 3px 10px;
  position: absolute;
  right: -10px;
  top: 10px;
  transform: rotate(20deg);
`;
const Button = styled.button`
  background-color: #b9935a;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  color: black;
  cursor: pointer;
  height: 60px;
  font-size: 20px;
  font-weight: ${(p: ButtonProps) => p.fWeight};
  padding: 6px 10px;
  position: relative;
  width: 100%;
  &:disabled {
    background: rgba(185, 147, 90, 0.3);
    cursor: not-allowed;
  }
`;
