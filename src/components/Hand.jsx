import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Hand = ({ arrayToRender, clicked, setClicked, setPcPlay }) => {
  return (
    <CardsGroup>
      {arrayToRender.map((animal) => {
        return (
          <Card
            attack={animal.attack}
            clicked={clicked}
            life={animal.life}
            family={animal.family}
            image={animal.image}
            key={animal.species}
            skillFn={() => {}}
            setClicked={setClicked}
            skill={animal.skill}
            species={animal.species}
            setPcPlay={setPcPlay}
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
});

export default Hand;
