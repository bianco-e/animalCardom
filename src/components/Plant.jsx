import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import Context, { SELECT_PLANT } from "../context/HandsContext";
import Media from "react-media";

const Plant = ({ plant }) => {
  const [state, dispatch] = useContext(Context);
  const { selectedPlant, pcTurn, usedPlants } = state;
  const { name, description, image } = plant;
  return (
    <>
      <Media
        queries={{
          sh: "(max-height: 565px)",
        }}
      >
        {(matches) => (
          <Fragment>
            <PlantCard
              outline={`${
                selectedPlant?.name === name &&
                "3px inset rgba(255, 129, 3, .8)"
              }`}
              onClick={() => {
                !pcTurn &&
                  !usedPlants.includes(plant) &&
                  dispatch({ type: SELECT_PLANT, plant });
              }}
              opacity={usedPlants.includes(plant) && "0.6"}
              mBottom={matches.sh && "8px"}
            >
              <PlantName fSize={matches.sh && "9px"}>{name}</PlantName>
              <Picture
                alt={name}
                title={description}
                src={image}
                width={matches.sh && "38px"}
                height={matches.sh && "38px"}
              ></Picture>
            </PlantCard>
          </Fragment>
        )}
      </Media>
    </>
  );
};

const PlantCard = styled.button({
  marginBottom: (props) => props.mBottom || "13px",
  padding: "2px",
  backgroundColor: "#d4a257",
  border: "none",
  minWidth: "60px",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "inset 0px 0px 2px black",
  opacity: (props) => props.opacity,
  outline: (props) => props.outline,
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 5px black",
  },
  ["&:active"]: {
    boxShadow: "inset 0px 0px 20px black",
  },
});
const PlantName = styled.h6({
  margin: "0",
  fontSize: (props) => props.fSize || "10px",
});
const Picture = styled.img({
  width: (props) => props.width || "45px",
  height: (props) => props.height || "45px",
  alt: (props) => props.alt,
  borderRadius: "5px",
});

export default Plant;
