import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import SimpleModal from "./components/SimpleModal";
import { SMALL_RESPONSIVE_BREAK } from "./lib/constants";

export default function WelcomePage() {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [rules, setRules] = useState(false);
  const [mobile, setMobile] = useState(false);

  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setMobile(true);
    }
  };

  useEffect(() => {
    isMobile();
  }, []);

  const onKeyDownFn = (e) => {
    if (e.key === "Enter") {
      if (inputValue !== "") {
        history.push(`/play/${inputValue}`);
        setInputValue("");
      } else {
        history.push(`/play/GUEST`);
      }
    }
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <Text isTitle={true}>Welcome to Animal Cardom!</Text>
        {mobile && (
          <SimpleModal setShowModal={setMobile} sign="device" width="60%" />
        )}
        <Button onClick={() => setRules(true)}>How to play</Button>
        {rules && <SimpleModal setShowModal={setRules} sign="rules" />}
        <WelcomeDiv>
          <Input
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) =>
              e.target.value.length < 8 && setInputValue(e.target.value)
            }
            onKeyDown={onKeyDownFn}
          />
        </WelcomeDiv>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-cardom.png);
  background-repeat: round;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;
const Text = styled.h4`
  font-family: ${({ isTitle }) => isTitle && "Fondamento; cursive;"}
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 24px;
  }
`;
const WelcomeDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  width: 30%;
`;
const Input = styled.input`
  background-color: #b9935a;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  padding: 3px;
  text-align: center;
  &:focus {
    background-color: #d4a257;
    border: 2px solid #b9935a;
  }
`;
const Button = styled.button`
  background-color: #b9935a;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  color: black;
  cursor: pointer;
  font-size: (props) => props.fontSize;
  padding: 4px;
`;
