import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { terrains } from "../data/data";
import HandsContext, { IHandsContext } from "../context/HandsContext";
import { EMPTY_STATE } from "../context/HandsContext/types";

const ANGLE = 360 / (terrains.length - 1);
interface IProps {
  xp: number;
}
export default function ({ xp }: IProps) {
  const [, dispatch] = useContext<IHandsContext>(HandsContext);
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]); //eslint-disable-line

  const handleCampaignGame = () => history.push(`/game?x=${xp}`);

  return (
    <Wrapper ref={containerRef}>
      {terrains.map((terrain, idx) => {
        const { image, name } = terrain;
        const isDisabled = idx > xp / 1000;
        return (
          <TerrainContainer
            angle={`${ANGLE * idx - 40}`}
            bgImage={image}
            containerWidth={containerWidth}
            disabled={isDisabled}
            key={name}
            level={idx + 1}
            onClick={() => !isDisabled && handleCampaignGame()}
            title={isDisabled ? "Locked" : name}
          ></TerrainContainer>
        );
      })}
    </Wrapper>
  );
}

interface TerrainContainerProps {
  angle?: string;
  bgImage?: string;
  containerWidth: number;
  disabled?: boolean;
  level?: number;
}
const Wrapper = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  margin: 120px 0 0 0;
`;
const TerrainContainer = styled.div`
  background-image: ${(p: TerrainContainerProps) => `url('${p.bgImage}')`};
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5), 0 0 40px 10px rgba(0, 0, 0, 0.5),
    0 0 40px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  height: 140px;
  left: 50%;
  justify-content: center;
  margin: calc(-100px / 2);
  position: absolute;
  top: 50%;
  transform: ${(p: TerrainContainerProps) =>
    `rotate(${p.angle}deg) translate(${p.containerWidth / 2}px) rotate(-${
      p.angle
    }deg)`};
  width: 140px;
  &:before {
    align-items: center;
    background: #d4a257;
    border-radius: 5px;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
    content: "${(p: TerrainContainerProps) => p.level}";
    display: flex;
    font-size: 9px;
    font-weight: bold;
    height: 14px;
    justify-content: center;
    padding: 4px 2px;
    width: 14px;
  }
  ${(p: TerrainContainerProps) =>
    p.disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;
