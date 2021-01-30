import React, { useContext } from "react";
import styled from "styled-components";
import Context, { SELECT_PLANT } from "../context/HandsContext";
import {
  LARGE_RESPONSIVE_BREAK,
  MEDIUM_RESPONSIVE_BREAK,
} from "../lib/constants";
import { Text } from "./styled-components";

export default function Plant({ plant }) {
  const [state, dispatch] = useContext(Context);
  const { selectedPlant, pcTurn, usedPlants } = state;
  const { name, description, image } = plant;
  return (
    <PlantCard
      outline={`${
        selectedPlant?.name === name && "3px inset rgba(255, 129, 3, .8)"
      }`}
      onClick={() => {
        !pcTurn &&
          !usedPlants.includes(plant) &&
          dispatch({ type: SELECT_PLANT, plant });
      }}
      opacity={usedPlants.includes(plant) && "0.6"}
    >
      <span>{name}</span>
      <img alt={name} title={description} src={image} />
    </PlantCard>
  );
}

const PlantCard = styled.button`
  align-items: center;
  background-color: #d4a257;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0px 0px 2px black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 25%;
  margin-bottom: 8%;
  opacity: ${({ opacity }) => opacity};
  outline: ${({ outline }) => outline};
  padding: 3px 3px 5px 3px;
  width: 70%;
  transition: transform 0.1s ease;
  @media (${LARGE_RESPONSIVE_BREAK}) {
    max-width: 55px;
  }
  > img {
    border-radius: 5px;
    height: 80%;
    width: 85%;
  }
  > span {
    font-size: 11px;
    font-weight: bold;
    @media (${LARGE_RESPONSIVE_BREAK}) {
      font-size: 10px;
    }
    @media (${MEDIUM_RESPONSIVE_BREAK}) {
      font-size: 8px;
    }
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    height: 45px;
    margin-bottom: 0;
    width: 45px;
  }
  &:hover {
    box-shadow: 4px 4px 4px #b9935a, inset 0px 0px 5px black;
    transform: scale(1.05);
  }
  &:active {
    box-shadow: inset 0px 0px 20px black;
  }
`;
