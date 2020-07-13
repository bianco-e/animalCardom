import React, { useContext } from "react";
import styled from "styled-components";
import Context, { SELECT_PLANT } from "../context/HandsContext";

const Plant = ({ plant }) => {
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
      <PlantName>{name}</PlantName>
      <Picture alt={name} title={description} src={image}></Picture>
    </PlantCard>
  );
};

const PlantCard = styled.button({
  marginBottom: "8px",
  padding: "2px",
  backgroundColor: "#d4a257",
  border: "none",
  minWidth: "60px",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "inset 0px 0px 2px black",
  opacity: (props) => props.opacity,
  outline: (props) => props.outline,
  ["&:lastchild"]: {
    marginBottom: "0",
  },
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 5px black",
  },
  ["&:active"]: {
    boxShadow: "inset 0px 0px 20px black",
  },
});
const PlantName = styled.h6({
  margin: "0",
  fontSize: "10px",
});
const Picture = styled.img({
  width: "45px",
  height: "45px",
  alt: (props) => props.alt,
  borderRadius: "5px",
});

export default Plant;
