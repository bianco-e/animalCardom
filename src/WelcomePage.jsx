import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import SimpleModal from "./components/SimpleModal";
import Media from "react-media";

const WelcomePage = () => {
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
      <Media
        queries={{
          small: "(max-width: 900px)",
        }}
      >
        {(matches) => (
          <Fragment>
            <Wrapper>
              <Text fontSize={matches.small && "24px"} title={true}>
                Welcome to Animal Cardom!
              </Text>
              {mobile && (
                <SimpleModal
                  setShowModal={setMobile}
                  sign="device"
                  width="60%"
                />
              )}
              <Button onClick={() => setRules(true)}>How to play</Button>
              {rules && (
                <SimpleModal
                  setShowModal={setRules}
                  sign="rules"
                  width={matches.small && "60%"}
                />
              )}
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
          </Fragment>
        )}
      </Media>
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
  fontSize: (props) => props.fontSize || "30px",
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
  backgroundColor: "#b9935a",
  textAlign: "center",
  boxShadow: `inset 0px 0px 3px black`,
  border: "2px solid #b9935a",
  borderRadius: "5px",
  padding: "3px",
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
  fontSize: (props) => props.fontSize,
  padding: "4px",
});

export default WelcomePage;
