import React from "react";
import styled from "styled-components";
import Plant from "./Plant";
import { LARGE_RESPONSIVE_BREAK } from "../lib/constants";
import { Text } from "./styled-components";

export default function SidePanel({ plants, terrain, username }) {
  return (
    <LeftPanel>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          PC
        </Text>
        {plants.pc.map((plant) => {
          return <Plant plant={plant}></Plant>;
        })}
      </HalfPanel>
      <TerrainContainer
        bgImage={terrain.image}
        color={terrain.color}
        title={`All animals belonging to ${terrain.familyToBuff} feel like home in ${terrain.type}. Their attack is increased by 1`}
      >
        <h3>{terrain.type}</h3>
        <span>{terrain.familyToBuff}</span>
      </TerrainContainer>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          {username}
        </Text>
        {plants.user.map((plant) => {
          return <Plant plant={plant}></Plant>;
        })}
      </HalfPanel>
    </LeftPanel>
  );
}

const LeftPanel = styled.div`
  align-items: justify-between;
  background: rgba(240, 240, 240, 0.6);
  border-radius: 0 10px 10px 0;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 110px;
  @media (${LARGE_RESPONSIVE_BREAK}) {
    width: 90px;
  }
`;
const HalfPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 33%;
`;
const TerrainContainer = styled.div`
  align-items: center;
  background: url(${({ bgImage }) => bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 20px rgba(240, 240, 240, 0.9);
  color: ${({ color }) => color};
  cursor: help;
  display: flex;
  height: 33%;
  flex-direction: column;
  justify-content: flex-start;
  > span {
    font-size: 30px;
  }
  @media (${LARGE_RESPONSIVE_BREAK}) {
    margin-top: 35px;
  }
`;
