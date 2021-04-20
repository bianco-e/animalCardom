import React, { useContext, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context, { SELECT_CARD } from "../context/HandsContext";
import {
  LARGE_RESPONSIVE_BREAK,
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../utils/constants";
import { generateAnimationString } from "../utils";

const cardSelection = keyframes`
  ${generateAnimationString(5)}
`;
const cardAttack = keyframes`
  20%, 90% {
    opacity: 1;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`;
const selectAnimation = css`
  ${cardSelection} 1.5s linear infinite;
`;
const attackAnimation = css`
  ${cardAttack} 0.25s linear;
`;
const attackAudio = new Audio("/audio/claw-sound-effect.mp3");

export default function Card({
  attack,
  belongsToUser,
  life,
  family,
  image,
  skill,
  species,
  poisoned,
  paralyzed,
  targeteable,
  bleeding,
}) {
  const [state, dispatch] = useContext(Context);
  const isCardSelected = state.attacker?.species === species;
  const isCardUnderAttack = state.underAttack === species;
  useEffect(() => {
    isCardUnderAttack && attackAudio.play();
  }, [isCardUnderAttack]);
  return (
    <AnimalCard
      animation={isCardSelected && selectAnimation}
      isCardSelected={isCardSelected}
      isParalyzed={paralyzed > 0}
      onClick={() => {
        !state.pcTurn && dispatch({ type: SELECT_CARD, species });
      }}
      opacity={`${life.current === "DEAD" && "0.5"}`}
      translate={belongsToUser ? "-10px" : "10px"}
    >
      <Injury animation={isCardUnderAttack && attackAnimation}>
        <img
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          alt="wound"
          className="big-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
      </Injury>
      <CornerIcon>{family}</CornerIcon>
      {!targeteable && <CornerIcon className="animal-status">🚫</CornerIcon>}
      {bleeding && (
        <CornerIcon className="animal-status">
          <Image className="bleeding-drop" src={utilitiesIcons.blood} />
        </CornerIcon>
      )}

      <Text className="animal-name">{species}</Text>

      <Image className="animal-picture" src={image} />

      <DescriptionContainer>
        <FlexSection mBottom="1px">
          <Image className="small-icon" src={utilitiesIcons.fury} />
          <Text
            className="skill"
            textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
          >
            {skill.name}
          </Text>
        </FlexSection>
        <Text
          className="skill"
          fWeight="regular"
          textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
        >
          {skill.description}
        </Text>
      </DescriptionContainer>

      <FlexSection>
        <Image className="small-icon" src={utilitiesIcons.attack} />
        <Text
          className="stats"
          color={`${
            attack.current > attack.initial
              ? "green"
              : attack.current < attack.initial && "red"
          }`}
        >
          {attack.current}
        </Text>

        {poisoned.rounds === 0 ? (
          <Text className="life-heart" margin="2px">
            🖤
          </Text>
        ) : (
          <Text className="life-heart" margin="2px">
            💚
          </Text>
        )}

        <Text
          className="stats"
          color={`${
            life.current > life.initial
              ? "green"
              : life.current < life.initial && "red"
          }`}
        >
          {life.current}
        </Text>
      </FlexSection>
    </AnimalCard>
  );
}

const Injury = styled.div`
  animation: ${({ animation }) => animation};
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 50%;
  opacity: 0;
  top: 6%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
  -webkit-transform: translateX(-50%);
  > img {
    &.big-wound {
      transform: rotate(60deg);
      width: 59%;
    }
    &.small-wound {
      transform: rotate(240deg);
      width: 27%;
    }
  }
`;

const AnimalCard = styled.button`
  align-items: center;
  animation: ${({ animation }) => animation};
  background: #d4a257;
  border: 2px solid #b9935a;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  opacity: ${({ opacity }) => opacity};
  padding: 12px;
  position: relative;
  transition: transform 0.1s ease;
  width: 17%;
  ${({ isParalyzed }) =>
    isParalyzed &&
    `
    filter: blur(0.4px);
  `}
  ${({ isCardSelected, translate }) =>
    isCardSelected
      ? `
    outline: 7px inset rgba(255, 129, 3, .8);
  `
      : `
    &:hover {
      box-shadow: 4px 4px 4px #b9935a, inset 0px 0px 15px black;
      transform: translateY(${translate});
    }
  `}
  &:active {
    box-shadow: inset 0px 0px 40px black;
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    max-width: 170px;
    padding: 9px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    max-width: 125px;
    padding: 6px;
  }
`;
const CornerIcon = styled.span`
  font-size: 30px;
  left: 2%;
  position: absolute;
  top: 2%;
  &.animal-status {
    left: auto;
    right: 2%;
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    font-size: 20px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 16px;
  }
`;
const Image = styled.img`
  &.bleeding-drop {
    height: 25px;
    width: 25px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      height: 20px;
      width: 20px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      height: 17px;
      width: 17px;
    }
  }
  &.animal-picture {
    border-radius: 120px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.6);
    height: 45%;
    width: 80%;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      width: 85%;
    }
  }
  &.small-icon {
    height: 20px;
    width: 20px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      height: 17px;
      width: 17px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      height: 15px;
      width: 15px;
    }
  }
`;
const Text = styled.span`
  &.life-heart {
    margin-left: 10px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.stats {
    margin-left: 3px;
    font-size: 20px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 12px;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      font-size: 9px;
    }
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 8px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 7px;
    }
  }
  &.animal-name {
    font-size: 22px;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      font-size: 18px;
    }
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 15px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
  }
  color: ${({ color }) => color};
  font-size: 14px;
  font-weight: ${({ fWeight = "bold" }) => fWeight};
  margin: ${({ margin }) => margin};
  text-align: center;
  text-decoration: ${({ textDeco }) => textDeco};
`;
const FlexSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ mBottom }) => mBottom};
`;
const DescriptionContainer = styled.div`
  align-items: center;
  background: #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px #e3cdac;
  display: flex;
  flex-direction: column;
  height: 28%;
  justify-content: flex-start;
  margin-top: 4px;
  overflow: auto;
  padding: 5px;
  width: 85%;
`;
