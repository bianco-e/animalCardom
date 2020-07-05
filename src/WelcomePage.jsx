import React, { useState } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import SimpleModal from "./components/SimpleModal";

const WelcomePage = () => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        <Text title={true}>Welcome to Animal Cardom!</Text>
        <Button onClick={() => setShowModal(true)}>How to play</Button>
        {showModal && <SimpleModal setShowModal={setShowModal} />}
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
  alignItems: "center",
  height: "100vh",
  backgroundImage:
    "url(https://www.pngonly.com/wp-content/uploads/2017/06/file-nature-png-10210.png)",
  backgroundRepeat: "round",
});
const Text = styled.h4({
  fontFamily: (props) => props.title && "Fondamento, cursive",
  textAlign: "center",
  fontSize: "30px",
  marginBottom: "30px",
});
const WelcomeDiv = styled.div({
  margin: "auto",
  width: "30%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
});
const Input = styled.input({
  textAlign: "center",
  backgroundColor: "#b9935a",
  border: "2px solid #d4a257",
  borderRadius: "5px",
  ["&:focus"]: {
    backgroundColor: "#d4a257",
    border: "2px solid #b9935a",
  },
});
const Button = styled.button({
  backgroundColor: "#b9935a",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  boxShadow: `inset 0px 0px 3px black`,
  cursor: "pointer",
  color: "black",
  width: "15%",
});

export default WelcomePage;
