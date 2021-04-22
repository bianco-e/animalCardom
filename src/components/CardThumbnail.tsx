import React from "react";
import styled from "styled-components";
import { AnimalCard } from "./Card";

interface IProps {
  disabled: boolean;
  species: string;
  image: string;
}

export default function CardThumbnail({ image, disabled, species }: IProps) {
  return (
    <Card
      isCardSelected={false}
      isParalyzed={false}
      opacity={disabled ? "0.5" : "1"}
    >
      <span className="animal-name">{species}</span>
      <img className="animal-picture" src={image} />
    </Card>
  );
}

const Card = styled(AnimalCard)`
  cursor: default;
  height: 80px;
  width: 18%;
  > .animal-name {
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  > .animal-picture {
    border-radius: 120px;
    height: 30px;
    width: 90%;
  }
  &:hover {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  }
`;
