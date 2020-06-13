import React, { useState } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import cardshand from "./images/cardshand.png";

const WelcomePage = () => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");

  const onKeyDownFn = (event) => {
    if (event.keyCode === 13) {
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
        <Text>Welcome to Animal Cardom!</Text>
        <WelcomeDiv>
          <Input
            type={"text"}
            placeholder={"Enter your name"}
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
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundImage: `url(${cardshand})`,
  height: "100vh",
});
const Text = styled.h4({
  textAlign: "center",
  fontSize: "30px",
  marginBottom: "30px",
});
const Input = styled.input({
  textAlign: "center",
  backgroundColor: "#b9935a",
  border: "1px solid black",
  borderRadius: "3px",
  ["&:focus"]: {
    backgroundColor: "#d4a257",
    border: "2px solid black",
    borderRadius: "3px",
  },
});
const WelcomeDiv = styled.div({
  margin: "auto",
  width: "30%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

export default WelcomePage;
