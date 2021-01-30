import React from "react";
import styled from "styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../lib/constants";
import Card from "./Card";

export default function Hand({ arrayToRender, belongsToUser }) {
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
            belongsToUser={belongsToUser}
            bleeding={bleeding}
            family={family}
            image={image}
            key={species}
            life={life}
            paralyzed={paralyzed}
            poisoned={poisoned}
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

const CardsGroup = styled.div`
  align-items: center;
  display: flex;
  height: 37%;
  justify-content: space-between;
  width: 100%;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    height: 45%;
  }
`;
