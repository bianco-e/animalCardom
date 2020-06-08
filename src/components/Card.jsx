import React, { useState, useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context from "../context/HandsContext";

var statsToCompare = [];

const Card = ({
  attack,
  clicked,
  life,
  family,
  image,
  skillFn,
  setClicked,
  skill,
  species,
  setPcPlay,
}) => {
  const [initialLife] = useState(life);
  const { hands, setHands, pcTurn, setPcTurn } = useContext(Context);
  // const [state, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    pcTurn && computerPlay();
  }, [pcTurn]);

  // HACER EL REDUCER PARA VER SI EVITA LOS RE-RENDERS

  useEffect(() => {
    if (hands.pc.every((card) => card.life === "DEAD")) {
      alert("You win!");
    }
    if (hands.user.every((card) => card.life === "DEAD")) {
      alert("Computer wins!");
    }
  }, [hands]);

  var pcLiveCards = hands.pc.filter((card) => card.life !== "DEAD");
  var userLiveCards = hands.user.filter((card) => card.life !== "DEAD");

  const changeCardLife = (hand, defender, newVal) => {
    var restingHand = hand === "user" ? "pc" : "user";
    setHands({
      [hand]: hands[hand].map((card) => {
        if (card === defender) {
          return { ...card, life: newVal };
        } else {
          return card;
        }
      }),
      [restingHand]: hands[restingHand],
    });
  };

  const computerDamage = (defender, attacker) => {
    var statsDiff = defender.life - attacker.attack;
    if (statsDiff < 1) {
      changeCardLife("user", defender, "DEAD");
      return "and KILLED IT";
    } else {
      changeCardLife("user", defender, statsDiff);
      return `inflicting ${attacker.attack} damage`;
    }
  };

  const computerPlay = () => {
    setPcTurn(!pcTurn);
    setPcPlay("Thinking...");
    var firstRandomNum = Math.floor(Math.random() * pcLiveCards.length);
    var secondRandomNum = Math.floor(Math.random() * userLiveCards.length);
    setTimeout(() => {
      setPcPlay(
        `${pcLiveCards[firstRandomNum].species} attacked ${
          userLiveCards[secondRandomNum].species
        } ${computerDamage(
          userLiveCards[secondRandomNum],
          pcLiveCards[firstRandomNum]
        )}`
      );
    }, 1400);
  };

  const triggerAndAddStat = (valToAdd) => {
    setClicked(!clicked);
    statsToCompare.push(valToAdd);
  };

  const damageEnemy = () => {
    var statsDiff = statsToCompare[1].life - statsToCompare[0].attack;
    if (statsDiff < 1) {
      changeCardLife("pc", statsToCompare[1], "DEAD");
    } else {
      changeCardLife("pc", statsToCompare[1], statsDiff);
    }
    statsToCompare = [];
    setClicked(!clicked);
    setPcTurn(!pcTurn);
  };

  const attackSelection = (animalCard) => {
    if (clicked) {
      if (pcLiveCards.includes(animalCard)) {
        triggerAndAddStat(animalCard);
        damageEnemy();
      } else if (statsToCompare[0] === animalCard) {
        setClicked(!clicked);
        statsToCompare = [];
      } else {
        alert("You can't do that! Select an alive enemy!");
      }
    } else if (userLiveCards.includes(animalCard)) {
      triggerAndAddStat(animalCard);
    }
  };

  return (
    <AnimalCard
      onClick={() => {
        attackSelection(
          pcLiveCards
            .concat(userLiveCards)
            .find((card) => card.species === species)
        );
        skillFn();
      }}
      opacity={`${life === "DEAD" && "0.5"}`}
      outline={`${
        statsToCompare[0]?.species === species &&
        "7px inset rgba(255, 129, 3, .8)"
      }`}
    >
      <FamilyIcon>{family}</FamilyIcon>

      <Text px={"20"}>{species}</Text>

      <Picture width={"190"} height={"140"} src={image} />

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
        <Text px={"12"} color={`${initialLife > life && "red"}`}>
          {life}
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
  padding: "15px",
  backgroundColor: "#d4a257",
  boxShadow: `inset 0px 0px 10px black`,
  outline: (props) => props.outline,
  opacity: (props) => props.opacity,
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 15px black",
  },
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
  borderRadius: "120px",
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
  width: "200px",
  padding: "5px",
  backgroundColor: "#b9935a",
  boxShadow: "inset 0px 0px 5px white",
  borderRadius: "5px",
});

export default Card;
