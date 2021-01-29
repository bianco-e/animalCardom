import React from "react";
import styled from "styled-components";
import Card from "./Card";

export default function Hand({
  arrayToRender,
  clicked,
  setClicked,
  setPcPlay,
}) {
  return (
    <CardsGroup>
      {arrayToRender.map((animal) => {
        const {
          attack,
          bleeding,
          family,
          image,
          life,
          paralyzed,
          poisoned,
          skill,
          species,
          targeteable,
          toDo,
        } = animal;
        return (
          <Card
            attack={attack}
            bleeding={bleeding}
            clicked={clicked}
            family={family}
            image={image}
            key={species}
            life={life}
            paralyzed={paralyzed}
            poisoned={poisoned}
            setClicked={setClicked}
            setPcPlay={setPcPlay}
            skill={skill}
            skillFn={toDo}
            species={species}
            targeteable={targeteable}
          />
        );
      })}
    </CardsGroup>
  );
}

const CardsGroup = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});
