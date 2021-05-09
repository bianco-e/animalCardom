import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogButton } from "../components/styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";

interface IProps {
  isAuthenticated: boolean;
  username?: string;
}

export default function NavBar({ isAuthenticated, username }: IProps) {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const [soundState, setSoundState] = useState<"off" | "on">("on");

  useEffect(() => {
    const currentSoundState = localStorage.getItem("sound");
    if (
      currentSoundState &&
      (currentSoundState === "off" || currentSoundState === "on")
    ) {
      setSoundState(currentSoundState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sound", soundState);
  }, [soundState]);

  const handleSoundButton = () => {
    const soundToSet = soundState === "off" ? "on" : "off";
    setSoundState(soundToSet);
  };

  const handleLogin = () => {
    if (isAuthenticated && username) {
      history.push("/menu");
    } else loginWithRedirect();
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
        <LogButton onClick={handleLogin}>
          {isAuthenticated && username ? (
            <span>
              You are allowed, <b>{username}!</b>
            </span>
          ) : (
            <span>
              Sign in with <b>Google</b>
            </span>
          )}
        </LogButton>
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
  @media (${SMALL_RESPONSIVE_BREAK}) {
    > img {
      display: none;
    }
  }
`;
const Wrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${({ theme }) => theme.secondary_brown};
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
