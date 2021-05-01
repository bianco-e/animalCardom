import { useContext, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { utilitiesIcons } from "../data/data";
import HandsContext from "../context/HandsContext";
import { SELECT_CARD } from "../context/HandsContext/types";
import {
  LARGE_RESPONSIVE_BREAK,
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../utils/constants";
import { generateAnimationString } from "../utils";
import { Poisoned, Skill, Stat } from "../interfaces";

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

interface IProps {
  attack: Stat<number>;
  belongsToUser?: boolean;
  bleeding: boolean;
  children?: JSX.Element;
  species: string;
  image: string;
  life: Stat<number | string>;
  onPreviewClick?: (name: string) => void;
  opacityForPreview?: string;
  paralyzed: number;
  poisoned: Poisoned;
  skill: Skill;
  name: string;
  targeteable: boolean;
}

export default function Card({
  attack,
  belongsToUser,
  children,
  life,
  species,
  image,
  skill,
  name,
  onPreviewClick,
  opacityForPreview,
  poisoned,
  paralyzed,
  targeteable,
  bleeding,
}: IProps) {
  const [state, dispatch] = useContext(HandsContext);
  const isCardSelected = state.attacker?.name === name;
  const isCardUnderAttack = state.underAttack === name;
  const soundState = localStorage.getItem("sound");
  useEffect(() => {
    isCardUnderAttack && soundState === "on" && attackAudio.play();
  }, [isCardUnderAttack, soundState]);
  const isForPreview = !!opacityForPreview;
  const cardProps = isForPreview
    ? {
        animation: "",
        cursor: onPreviewClick ? "pointer" : "default",
        isCardSelected: false,
        isParalyzed: false,
        onClick: () => onPreviewClick && onPreviewClick(name),
        opacity: opacityForPreview ? opacityForPreview : "",
        transform: "",
      }
    : {
        animation: isCardSelected && selectAnimation,
        cursor: "pointer",
        isCardSelected,
        isParalyzed: paralyzed > 0,
        onClick: () => !state.pcTurn && dispatch({ type: SELECT_CARD, name }),
        opacity: `${life.current === "DEAD" && "0.5"}`,
        transform: belongsToUser ? "translateY(-10px)" : "translateY(10px)",
      };
  return (
    <AnimalCard {...cardProps}>
      {children}
      <Injury animation={isCardUnderAttack && attackAnimation}>
        <img
          draggable="false"
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          draggable="false"
          alt="wound"
          className="big-wound"
          src="/images/svg/blood-splatter.svg"
        />
        <img
          draggable="false"
          alt="wound"
          className="small-wound"
          src="/images/svg/blood-splatter.svg"
        />
      </Injury>
      <CornerIconContainer>
        <span>{species}</span>
      </CornerIconContainer>
      {!targeteable && (
        <CornerIconContainer className="animal-status">
          <span>{`\u{1F6AB}`}</span>
        </CornerIconContainer> //unicode for emoji
      )}
      {bleeding && (
        <CornerIconContainer className="animal-status">
          <Image className="bleeding-drop" src={utilitiesIcons.blood} />
        </CornerIconContainer>
      )}

      <Text className="animal-name">{name}</Text>

      <Image className="animal-picture" draggable="false" src={image} />

      <DescriptionContainer>
        <FlexSection mBottom="1px">
          <Image
            className="small-icon"
            src={
              skill.types.includes("defensive")
                ? utilitiesIcons.defense
                : utilitiesIcons.fury
            }
          />
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
          textDeco={`${paralyzed > 0 && "line-through 1px #dd5540"}`}
        >
          {skill.description}
        </Text>
      </DescriptionContainer>
      <StatsContainer>
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
          <Text className="life-heart" margin="2px">
            {
              poisoned.rounds === 0
                ? `\u{1F5A4}` /* unicode for black heart emoji */
                : `\u{1F49A}` /* unicode for green heart emoji */
            }
          </Text>
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
          {paralyzed > 0 && (
            <span className="negative-stats paralyze-stats">{paralyzed}</span>
          )}
          {poisoned.rounds > 0 && (
            <span className="negative-stats poison-stats">
              {poisoned.damage}/{poisoned.rounds}
            </span>
          )}
        </FlexSection>
      </StatsContainer>
    </AnimalCard>
  );
}

interface InjuryProps {
  animation?: any;
}
interface AnimalCardProps {
  animation?: any;
  cursor?: string;
  isCardSelected: boolean;
  isParalyzed: boolean;
  opacity: string;
  transform?: string;
}
interface TextProps {
  color?: string;
  fWeight?: string;
  margin?: string;
  textDeco?: string;
}
interface FlexSectionProps {
  mBottom?: string;
}
const Injury = styled.div`
  animation: ${(p: InjuryProps) => p.animation};
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 50%;
  opacity: 0;
  top: 6%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
  -webkit-transform: translateX(-50%);
  z-index: 20;
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
export const AnimalCard = styled.button`
  align-items: center;
  animation: ${(p: AnimalCardProps) => p.animation};
  background: #d4a257;
  border: 2px solid #b9935a;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  cursor: ${(p: AnimalCardProps) => p.cursor};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  overflow: hidden;
  opacity: ${(p: AnimalCardProps) => p.opacity};
  padding: 12px;
  position: relative;
  transition: transform 0.1s ease;
  width: 17%;
  ${(p: AnimalCardProps) =>
    p.isParalyzed &&
    `
    filter: blur(0.4px);
  `}
  ${(p: AnimalCardProps) =>
    p.isCardSelected
      ? `
    outline: 7px inset rgba(255, 129, 3, .8);
  `
      : `
    &:hover {
      box-shadow: 4px 4px 4px #b9935a, inset 0px 0px 15px black;
      transform: ${p.transform};
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
const StatsContainer = styled.div`
  align-items: center;
  background: #d4a257;
  border-radius: 50px 50px 0 0;
  border: 2px solid #b9935a;
  border-bottom: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  height: 30px;
  justify-content: space-around;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  transition: all 0.4s ease;
  width: 130px;
  bottom: 0;
`;

const CornerIconContainer = styled.div`
  background: #d4a257;
  border-radius: 50%;
  border: 2px solid #b9935a;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: 60px;
  left: -30px;
  position: absolute;
  top: -30px;
  width: 60px;
  > span {
    font-size: 14px;
    position: absolute;
    left: 32px;
    top: 32px;
  }
  &.animal-status {
    left: auto;
    right: -30px;
    > img {
      position: absolute;
      right: 30px;
      top: 30px;
    }
    > span {
      left: auto;
      right: 32px;
      top: 32px;
    }
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
    height: 20px;
    width: 20px;
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
    position: relative;
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
    font-size: 16px;
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
  color: ${(p: TextProps) => p.color};
  font-size: 14px;
  font-weight: ${(p: TextProps) => p.fWeight || "bold"};
  margin: ${(p: TextProps) => p.margin};
  text-align: center;
  text-decoration: ${(p: TextProps) => p.textDeco};
`;
const FlexSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: ${(p: FlexSectionProps) => p.mBottom};
  position: relative;
  > span.negative-stats {
    background: #d4a257;
    border-radius: 5px;
    border: 2px solid #b9935a;
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.5);
    font-size: 11px;
    font-weight: bold;
    position: absolute;
    top: -5px;
    transform: rotate(30deg);
    padding: 1px 2px;
  }
  > span.poison-stats {
    color: green;
    right: -25px;
  }
  > span.paralyze-stats {
    color: #dd5540;
    left: -20px;
    transform: rotate(-30deg);
  }
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
  margin: 4px 0 30px 0;
  overflow: auto;
  padding: 5px;
  width: 85%;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #e3cdac;
    border-radius: 0 5px 5px 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b9935a;
  }
`;
