import React, { useContext } from "react";
import styled from "styled-components";
import Plant from "./Plant";
import UserContext from "../context/UserContext";
import {
  LARGE_RESPONSIVE_BREAK,
  MEDIUM_RESPONSIVE_BREAK,
  SMALL_RESPONSIVE_BREAK,
} from "../utils/constants";
import { Text } from "./styled-components";
import { IPlants, ITerrain } from "../interfaces/index";

interface IProps {
  plants: IPlants;
  terrain: ITerrain;
}

export default function SidePanel({ plants, terrain }: IProps) {
  const [state, dispatch] = useContext(UserContext);
  const username = localStorage.getItem("username");
  return (
    <LeftPanel bgImage={terrain.image}>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          PC
        </Text>
        <PlayerNameTab>PC</PlayerNameTab>
        {plants.pc.map((plant) => {
          return <Plant plant={plant}></Plant>;
        })}
      </HalfPanel>
      <TerrainName
        color={terrain.color}
        title={`All animals belonging to ${terrain.familyToBuff} feel like home in ${terrain.type}. Their attack is increased by 1`}
      >
        {terrain.type}
      </TerrainName>
      <HalfPanel>
        <Text fSize="18px" fWeight="bold" padding="5px">
          {username}
        </Text>
        <PlayerNameTab>{username}</PlayerNameTab>
        {plants.user.map((plant) => {
          return <Plant plant={plant}></Plant>;
        })}
      </HalfPanel>
    </LeftPanel>
  );
}

interface LeftPanelProps {
  bgImage?: string;
}
const PlayerNameTab = styled.div`
  background: rgba(240, 240, 240, 0.6);
  box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
  bottom: -48px;
  display: none;
  font-weight: bold;
  left: 50%;
  padding: 1px 12px;
  position: absolute;
  transform: translate(-50%, -50%);
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    display: flex;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    bottom: -42px;
    font-size: 14px;
  }
`;
const LeftPanel = styled.div`
  background: url(${(p: LeftPanelProps) => p.bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0 10px 10px 0;
  box-shadow: 35px 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 110px;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    align-items: center;
    background: url(${({ bgImage }) => bgImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 35px 40px rgba(0, 0, 0, 0.2);
    flex-direction: row;
    height: 50px;
    justify-content: space-around;
    width: 100%;
  }
`;
const HalfPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 33%;
  @media (${LARGE_RESPONSIVE_BREAK}) {
    > span {
      font-size: 13px;
    }
  }
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    width: 30%;
    z-index: 2;
    > span {
      display: none;
    }
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    width: 40%;
  }
`;
const TerrainName = styled.h3`
  align-items: center;
  color: ${({ color }) => color};
  cursor: help;
  display: flex;
  height: 33%;
  justify-content: center;
  text-shadow: rgba(10, 10, 10, 0.6) 0px 1px 5px;
  @media (${MEDIUM_RESPONSIVE_BREAK}) {
    width: 90px;
    min-height: auto;
    height: 100%;
  }
  @media (${SMALL_RESPONSIVE_BREAK}) {
    font-size: 14px;
  }
`;
