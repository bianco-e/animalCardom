import React, { useContext } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context, { SELECT_CARD } from "../context/HandsContext";

const Card = ({
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
}) => {
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
      <CornerIcon leftDist="3px">{family}</CornerIcon>
      <CornerIcon leftDist="185px">{!targeteable && "🚫"}</CornerIcon>
      {bleeding && (
        <CornerIcon leftDist="186px">
          <Picture width="25" height="25" src={utilitiesIcons.blood} />
        </CornerIcon>
      )}

      <Text fSize="20px">{species}</Text>

      <Picture width="170" height="120" src={image} />

      <DescriptionDiv>
        <FlexSection>
          <Picture width="20" height="20" src={utilitiesIcons.fury} />
          <Text
            fSize="12px"
            textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
          >
            {skill.name}
          </Text>
        </FlexSection>
        <Text
          fSize="10px"
          textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
        >
          {skill.description}
        </Text>
      </DescriptionDiv>

      <FlexSection>
        <Picture width="20" height="20" src={utilitiesIcons.attack} />
        <Text
          fSize="16px"
          color={`${
            attack.current > attack.initial
              ? "green"
              : attack.current < attack.initial && "red"
          }`}
        >
          {attack.current}
        </Text>

        {poisoned.rounds === 0 ? (
          <Text margin={"2px"}>🖤</Text>
        ) : (
          <Text margin={"2px"}>💚</Text>
        )}

        <Text
          fSize="16px"
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
};

const AnimalCard = styled.button({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  cursor: "pointer",
  position: "relative",
  padding: "12px",
  backgroundColor: "#d4a257",
  boxShadow: `inset 0px 0px 10px black`,
  outline: (props) => props.outline,
  opacity: (props) => props.opacity,
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 15px black",
  },
  ["&:active"]: {
    boxShadow: "inset 0px 0px 40px black",
  },
});
const CornerIcon = styled.span({
  fontSize: "25px",
  position: "absolute",
  top: "3px",
  left: (props) => props.leftDist,
});
const Picture = styled.img({
  width: (props) => `${props.width}px`,
  height: (props) => `${props.height}px`,
  borderRadius: "120px",
});
const Text = styled.h3({
  color: (props) => props.color,
  fontSize: (props) => props.fSize || "14px",
  margin: (props) => props.margin || "0",
  textAlign: "center",
  textDecoration: (props) => props.textDeco,
});
const FlexSection = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DescriptionDiv = styled.div({
  marginTop: "4px",
  width: "180px",
  height: "60px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#b9935a",
  boxShadow: "inset 0px 0px 10px #e3cdac",
  borderRadius: "5px",
});

export default Card;
