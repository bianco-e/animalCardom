import React from "react";
import styled from "styled-components";

const TOTAL_LEVELS = 9;
interface IProps {
  xp: number;
}
export default function CampaignProgress({ xp }: IProps) {
  const barWidth = (xp / 1000 / TOTAL_LEVELS) * 100;
  return (
    <Wrapper>
      <Title>Campaign Progress</Title>
      <ProgressBar barWidth={barWidth}>
        <div></div>
      </ProgressBar>
      <SmallText>
        <b>{barWidth.toFixed(0)} %</b>
      </SmallText>
    </Wrapper>
  );
}

interface ProgressBarProps {
  barWidth?: number;
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const ProgressBar = styled.div`
  background: color: none;
  border: 1px solid #5f0a87;
  border-radius: 5px;
  height: 15px;
  margin: 10px 0;
  width: 200px;
  > div {
    background-color: #5f0a87;
    background-image: linear-gradient(#5f0a87, #a4508b);
    border-radius: 5px;
    height: 15px;
    transition: all 0.4s ease;
    width: ${(p: ProgressBarProps) => p.barWidth}%;
  }
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const SmallText = styled.span`
  font-size: 10px;
`;
