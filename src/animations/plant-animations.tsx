import { keyframes, css } from "styled-components";
const poison = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0.1; 
  }
  10% {
    transform: translateY(50px);
    opacity: 0.2; 
  }
  20% {
    transform: translateY(40px);
    opacity: 0.3;
  }
  80% {
    transform: translateY(0);
    opacity: 0.9;
  }
  95% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

const paralyze = keyframes`
  0% {
    margin-top: 20%;
    transform: rotate(0deg);
    opacity: 0.1; 
  }
  20% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.9;
  }
  95% {
    opacity: 0.3;
  }
  100% {
    transform: rotate(1080deg);
    opacity: 0;
  }
`;

export const poisonAnimation = css`
  animation: 0.75s ${poison} linear;
`;
export const paralyzeAnimation = css`
  animation: 0.75s ${paralyze} linear;
`;
