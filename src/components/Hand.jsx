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
            bleeding={animal.bleeding}
            clicked={clicked}
            life={animal.life}
            family={animal.family}
            image={animal.image}
            key={animal.species}
            paralyzed={animal.paralyzed}
            poisoned={animal.poisoned}
            skillFn={animal.toDo}
            setClicked={setClicked}
            skill={animal.skill}
            species={animal.species}
            setPcPlay={setPcPlay}
            targeteable={animal.targeteable}
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
