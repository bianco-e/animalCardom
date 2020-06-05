import React from "react";
import styled from "styled-components";
import Card from "./Card";

const FiveCards = ({ arrayToRender, clicked, setClicked }) => {
  return (
    <CardsGroup>
      {arrayToRender.map((animal) => {
        return (
          <Card
            attack={animal.attack}
            clicked={clicked}
            defense={animal.defense}
            family={animal.family}
            image={animal.image}
            key={animal.species}
            onClickFn={() => {}}
            setClicked={setClicked}
            skill={animal.skill}
            species={animal.species}
          />
        );
      })}
    </CardsGroup>
  );
};

const CardsGroup = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export default FiveCards;
