import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function NavBar() {
  const [soundState, setSoundState] = useState<"off" | "on">("on");
  useEffect(() => {
    localStorage.setItem("sound", soundState);
  }, [soundState]);

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off";
    setSoundState(soundToSet);
  };

  return (
    <Wrapper>
      <Container>
        <OptionButton onClick={handleSoundButton}>
          <img
            alt="sound-button"
            src={`/icons/sound-${soundState}-icon.png`}
            width={40}
          />
        </OptionButton>
        <img alt="ac-logo" src="/images/animal-cardom-logo.png" width={60} />
        <LoginButton>
          Login with <b>Google</b>
        </LoginButton>
      </Container>
    </Wrapper>
  );
}

const OptionButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  > img {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;
const Wrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #b9935a;
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3),
    inset 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  height: 70px;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;
const LoginButton = styled.button`
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;
  padding: 6px 10px;
`;
