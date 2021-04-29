import styled from "styled-components";

interface IProps {
  height?: string;
  width?: string;
}
export default function AnimatedPlaceholder({ height, width }: IProps) {
  return <Wrapper height={height} width={width}></Wrapper>;
}

interface WrapperProps {
  height?: string;
  width?: string;
}
const Wrapper = styled.span`
  background: #d4a257;
  background: linear-gradient(
    90deg,
    rgba(185, 147, 90, 0.9) 0%,
    rgba(95, 57, 0, 0.8) 7%,
    rgba(95, 57, 0, 0.8) 13%,
    rgba(185, 147, 90, 0.9) 25%
  );
  animation-timing-function: ease-in-out;
  animation: animation 1.8s infinite;
  background-position: 100% 0%;
  background-size: 900%;
  border-radius: 5px;
  height: ${(p: WrapperProps) => p.height || "25px"};
  width: ${(p: WrapperProps) => p.width || "130px"};
  @keyframes animation {
    0% {
      background-position: 100% 0%;
    }
    99.99% {
      background-position: -30% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;
