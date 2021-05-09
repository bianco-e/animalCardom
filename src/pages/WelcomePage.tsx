import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CustomModal from "../components/CustomModal";
import NavBar from "../components/NavBar";
import ModalWelcomeContent from "../components/ModalWelcomeContent";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import { ACButton, ComingSoon } from "../components/styled-components";
import { useAuth0 } from "@auth0/auth0-react";

export default function WelcomePage() {
  const { user, isAuthenticated } = useAuth0();
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>("");
  const [modal, setModal] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

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
    const guest = localStorage.getItem("guest");
    guest && setInputValue(guest);
  }, []);

  const goToPlay = () => {
    if (inputValue !== "") {
      localStorage.setItem("guest", inputValue);
      history.push(`/play`);
      setInputValue("");
    } else setShowErrorMessage(true);
  };

  const onKeyDownFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToPlay();
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
          <ModalWelcomeContent modal={modal} />
        </CustomModal>
      )}
      <Container>
        {showErrorMessage && (
          <ErrorMessage>
            Nameless people are not allowed in Animal Cardom!
          </ErrorMessage>
        )}
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

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary_red};
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  top: 60px;
`;
const Wrapper = styled.div`
  align-items: center;
  background-image: url(/images/welcome-background.png);
  background-repeat: round;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
  @media (${SMALL_RESPONSIVE_BREAK}) {
  }
`;
const Title = styled.h4`
  font-size: 30px;
  text-align: center;
  padding-top: 60px;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    margin-bottom: 5px;
    font-size: 24px;
  }
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: space-around;
  margin: auto;
  position: relative;
  width: 40%;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    height: 65vh;
    width: 60%;
  }
`;
const Input = styled.input`
  background: ${({ theme }) => theme.primary_brown};
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  font-size: 18px;
  height: 30px;
  margin-bottom: 40px;
  padding: 6px 10px;
  text-align: center;
  width: 96%;
  &:focus {
    background: ${({ theme }) => theme.secondary_brown};
  }
  &::placeholder {
    color: #000;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    margin-bottom: 10px;
  }
`;
