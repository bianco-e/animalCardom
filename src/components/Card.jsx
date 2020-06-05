import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { utilitiesIcons, tenCards } from "../data/data.jsx";

var statsToCompare = [];

const Card = ({
  attack,
  clicked,
  life,
  family,
  image,
  onClickFn,
  setClicked,
  skill,
  species,
}) => {
  const [currentLife, setCurrentLife] = useState(life);
  const computerHand = tenCards.computerCards;
  const userHand = tenCards.userCards;

  const triggerAndPush = (valToPush) => {
    setClicked(!clicked);
    statsToCompare.push(valToPush);
  };

  const damageEnemy = () => {
    var statsDiff = statsToCompare[1].currentLife - statsToCompare[0].attack;
    if (statsDiff < 1) {
      setCurrentLife("DEAD");
    } else {
      setCurrentLife(statsDiff);
    }
  };

  const attackSelection = (valToPush) => {
    if (statsToCompare.length < 2) {
      if (clicked) {
        if (
          !userHand.some((card) => card.species === valToPush.species) &&
          currentLife !== "DEAD"
        ) {
          triggerAndPush(valToPush);
          damageEnemy();
        } else {
          alert("You can't do that! Select an alive enemy!");
        }
      } else {
        triggerAndPush(valToPush);
      }
    } else {
      statsToCompare = [];
      triggerAndPush(valToPush);
    }
  };

  return (
    <AnimalCard
      onClick={() => {
        !clicked
          ? attackSelection({ species, attack })
          : attackSelection({ species, currentLife });
        onClickFn();
      }}
      opacity={`${currentLife === "DEAD" && "0.5"}`}
    >
      <FamilyIcon>{family}</FamilyIcon>

      <Text px={"20"}>{species}</Text>

      <Picture width={"200"} height={"140"} src={image} />

      <FlexSection justify={"center"}>
        <Picture width={"20"} height={"20"} src={utilitiesIcons.fury} />
        <Text px={"12"}>{skill.name}</Text>
      </FlexSection>

      <DescriptionDiv>
        <Text px={"8"}>{skill.description}</Text>
      </DescriptionDiv>

      <FlexSection>
        <Picture width={"20"} height={"20"} src={utilitiesIcons.attack} />
        <Text px={"12"}>{attack}</Text>

        <Picture width={"20"} height={"20"} src={utilitiesIcons.life} />
        <Text px={"12"} color={`${currentLife !== life && "red"}`}>
          {currentLife}
        </Text>
      </FlexSection>
    </AnimalCard>
  );
};

const AnimalCard = styled.button({
  ["&:focus"]: {
    boxShadow: "20px 20px 20px black",
  },
  ["&:hover"]: {
    boxShadow: "15px 15px 15px brown",
  },
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  position: "relative",
  padding: "15px",
  backgroundColor: "#d4a257",
  boxShadow: "inset 0px 0px 10px black",
  cursor: "pointer",
  opacity: (props) => props.opacity,
});

const FamilyIcon = styled.span({
  fontSize: "25px",
  position: "absolute",
  top: "3px",
  left: "3px",
});
const Picture = styled.img({
  width: (props) => `${props.width}px`,
  height: (props) => `${props.height}px`,
});
const Text = styled.h3({
  color: (props) => props.color,
  fontSize: (props) => `${props.px}px`,
  margin: "0",
  textAlign: "center",
});
const FlexSection = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: (props) => props.justify,
});
const DescriptionDiv = styled.div({
  width: "210px",
  padding: "5px",
  backgroundColor: "#b9935a",
  boxShadow: "inset 0px 0px 5px whitesmoke",
  borderRadius: "5px",
});

export default Card;
