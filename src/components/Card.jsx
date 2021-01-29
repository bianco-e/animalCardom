import React, { useContext } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context, { SELECT_CARD } from "../context/HandsContext";
import {
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../lib/constants";

export default function Card({
  attack,
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
  return (
    <AnimalCard
      onClick={() => {
        !state.pcTurn && dispatch({ type: SELECT_CARD, species });
      }}
      opacity={`${life.current === "DEAD" && "0.5"}`}
      outline={`${
        state.attacker?.species === species && "7px inset rgba(255, 129, 3, .8)"
      }`}
    >
      <CornerIcon>{family}</CornerIcon>
      {!targeteable && <CornerIcon className="animal-status">"🚫"</CornerIcon>}
      {bleeding && (
        <CornerIcon className="animal-status">
          <Image className="bleeding-drop" src={utilitiesIcons.blood} />
        </CornerIcon>
      )}

      <Text className="animal-name">{species}</Text>

      <Image className="animal-picture" src={image} />

      <DescriptionContainer>
        <FlexSection>
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

const AnimalCard = styled.button`
  align-items: center;
  background: #d4a257;
  border: 2px solid #b9935a;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${({ opacity }) => opacity};
  outline: ${({ outline }) => outline};
  padding: 12px;
  position: relative;
  &:hover {
    box-shadow: 4px 4px 4px #b9935a, inset 0px 0px 15px black;
  }
  &:active {
    box-shadow: inset 0px 0px 40px black;
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    padding: 9px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    padding: 6px;
  }
`;
const CornerIcon = styled.span`
  font-size: 25px;
  left: 3px;
  position: absolute;
  top: 3px;
  &.animal-status {
    left: 185px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      left: 147pxpx;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      left: 118px;
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
    height: 120px;
    width: 170px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      height: 90px;
      width: 130px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      height: 80px;
      width: 110px;
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
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.stats {
    font-size: 16px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 13px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 12px;
    }
  }
  &.skill {
    font-size: 11px;
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 9px;
    }
    @media (${SMALL_RESPONSIVE_BREAK}) {
      font-size: 8px;
    }
  }
  &.animal-name {
    font-size: 20px;
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
`;
const DescriptionContainer = styled.div`
  align-items: center;
  background: #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px #e3cdac;
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: flex-start;
  margin-top: 4px;
  padding: 5px;
  width: 180px;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    width: 145px;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    width: 115px;
  }
`;
