import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { terrains } from "../data/data";

const ANGLE = 360 - 76.5;
const DANGLE = 360 / terrains.length;
interface IProps {
  userCampaignLevel: number;
}
export default function ({ userCampaignLevel }: IProps) {
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);
  return (
    <Wrapper ref={containerRef}>
      {terrains.map((terrain, idx) => {
        const { image, type } = terrain;
        const isDisabled = idx > userCampaignLevel;
        return (
          <TerrainContainer
            angle={`${(ANGLE + DANGLE) * idx - 1}`}
            bgImage={image}
            disabled={isDisabled}
            containerWidth={containerWidth}
            level={idx + 1}
            title={isDisabled ? "Locked" : type}
            key={type}
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
  width: 900px;
  height: 900px;
  margin: calc(220px / 2 + 0px);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 2px * 2);
    height: calc(100% - 2px * 2);
    border-radius: 50%;
  }
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
  height: 120px;
  left: 50%;
  justify-content: center;
  margin: calc(-100px / 2);
  position: absolute;
  top: 50%;
  transform: ${(p: TerrainContainerProps) =>
    `rotate(${p.angle}deg) translate(${p.containerWidth / 2}px) rotate(-${
      p.angle
    }deg)`};
  width: 120px;
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
