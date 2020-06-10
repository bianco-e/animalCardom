import React from "react";
import styled from "styled-components";
import Plant from "./Plant";

const Panel = ({ plants, player }) => {
  return (
    <HalfPanel>
      <PlayerName>{player}</PlayerName>
      {plants.map((plant) => {
        return <Plant plant={plant}></Plant>;
      })}
    </HalfPanel>
  );
};

const HalfPanel = styled.div({
  height: "49vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const PlayerName = styled.h3({
  margin: "0",
  padding: "5px",
  fontSize: "20px",
});

export default Panel;
