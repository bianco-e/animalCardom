import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ACButton } from "../components/styled-components";

export default function ErrorPage() {
  const { push } = useHistory();
  return (
    <Wrapper>
      <CardLetter>
        <Title>Oops...</Title>
        <Title>Looks like something went wrong</Title>
        <img src="/images/welcome-background.png" width={500} />
        <ACButton onClick={() => push("/")}>Go to menu</ACButton>
      </CardLetter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 20px;
  text-align: center;
`;
const CardLetter = styled.div`
  align-items: center;
  background: #d4a257;
  border-radius: 5px;
  border: 2px solid #b9935a;
  box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.1),
    0 0 5px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 75%;
  margin: auto;
  padding: 40px 20px;
  width: 30%;
  > img {
    border-radius: 5px;
    margin: 10px 0 60px 0;
  }
`;
