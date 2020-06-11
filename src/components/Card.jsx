import React, { useContext } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context, { SELECT_CARD } from "../context/HandsContext";

const Card = ({ attack, life, family, image, skill, species, poisoned }) => {
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

      <Text margin={"0"} px={"20"}>
        {species}
      </Text>

      <Picture width={"180"} height={"130"} src={image} />

      <FlexSection justify={"center"}>
        <Picture width={"20"} height={"20"} src={utilitiesIcons.fury} />
        <Text margin={"0"} px={"12"}>
          {skill.name}
        </Text>
      </FlexSection>

      <DescriptionDiv>
        <Text margin={"0"} px={"8"}>
          {skill.description}
        </Text>
      </DescriptionDiv>

      <FlexSection>
        <Picture width={"20"} height={"20"} src={utilitiesIcons.attack} />
        <Text
          margin={"0"}
          px={"14"}
          color={`${attack.current > attack.initial && "green"}`}
        >
          {attack.current}
        </Text>

        {poisoned.rounds === 0 ? (
          <Text margin={"2px"} px={"14"}>
            🖤
          </Text>
        ) : (
          <Text margin={"2px"} px={"14"}>
            💚
          </Text>
        )}

        <Text
          margin={"0"}
          px={"14"}
          color={`${life.current < life.initial && "red"}`}
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
  left: "3px",
});
const Picture = styled.img({
  width: (props) => `${props.width}px`,
  height: (props) => `${props.height}px`,
  borderRadius: "120px",
});
const Text = styled.h3({
  color: (props) => props.color,
  fontSize: (props) => `${props.px}px`,
  margin: (props) => props.margin,
  textAlign: "center",
});
const FlexSection = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: (props) => props.justify,
});
const DescriptionDiv = styled.div({
  width: "185px",
  padding: "5px",
  backgroundColor: "#b9935a",
  boxShadow: "inset 0px 0px 5px white",
  borderRadius: "5px",
});

export default Card;
