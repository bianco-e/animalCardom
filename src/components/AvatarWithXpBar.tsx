import React, { useEffect, useState } from "react";
import styled from "styled-components";
const MAX_XP = 1000;
const STROKE_WIDTH = 10;
const CIRCLE_RADIUS = 70;
const CIRCLE_CIRCUMFERENCE = CIRCLE_RADIUS * 2 * Math.PI;

interface IProps {
  havingXp: number;
}

export default function AvatarWithXpBar({ havingXp }: IProps) {
  const [dashoffset, setDashoffset] = useState<number>();
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    const currentLvlXp = havingXp % MAX_XP;
    const percent = (currentLvlXp * 100) / MAX_XP;
    setLevel(Math.floor(havingXp / 1000) + 1);
    setDashoffset(
      CIRCLE_CIRCUMFERENCE - (percent / 100) * CIRCLE_CIRCUMFERENCE
    );
  }, [havingXp]);

  return (
    <Wrapper
      dasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
      dashoffset={dashoffset}
    >
      <svg className="progress-ring" height="170" width="170">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#5f0a87" />
            <stop offset="100%" stop-color="#a4508b" />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring__circle"
          stroke-width={STROKE_WIDTH}
          fill="transparent"
          r={CIRCLE_RADIUS}
          cx={CIRCLE_RADIUS + STROKE_WIDTH * 2}
          cy={CIRCLE_RADIUS + STROKE_WIDTH * 2}
        />
      </svg>
      <img
        alt="avatar"
        src="/images/welcome-background.png"
        height={135}
        width={135}
      />
      <span>
        Lv. <b>{level}</b>
      </span>
    </Wrapper>
  );
}

interface WrapperProps {
  dasharray?: string;
  dashoffset?: number;
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  > svg {
    position: absolute;
    left: -23px;
    top: -13px;
    .progress-ring__circle {
      stroke: url(#gradient);
      stroke-dasharray: ${(p: WrapperProps) => p.dasharray};
      stroke-dashoffset: ${(p: WrapperProps) => p.dashoffset};
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dashoffset 0.5s;
    }
    .progress-ring__background {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
  }
  > img {
    border-radius: 50%;
  }
  > span {
    font-size: 11px;
    margin-top: 10px;
  }
`;
