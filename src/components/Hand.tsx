import React from "react";
import styled from "styled-components";
import { IAnimal } from "../interfaces";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";
import Card from "./Card";

interface IProps {
  hand: IAnimal[];
  belongsToUser: boolean;
}

export default function Hand({ hand, belongsToUser }: IProps) {
  return (
    <CardsGroup>
      {hand.map((animal) => {
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