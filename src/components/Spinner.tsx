import React from "react";
import styled from "styled-components";

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <Wrapper className="lds-circle">
        <div></div>
      </Wrapper>
    </SpinnerWrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  transform: translateZ(1px);
  > div {
    animation: lds-circle 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    background: #d4a257;
    border-radius: 5px;
    border: 2px solid #b9935a;
    height: 80px;
    margin: 8px;
    width: 55px;
  }
  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`;
const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
`;
