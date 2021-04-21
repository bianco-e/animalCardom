import React from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return isLoading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : !isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Wrapper>
      <SideMenu username={user.given_name} />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 290px;
`;
const ChildrenContainer = styled.div`
  align-items: center;
  background: rgba(95, 57, 0, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
  width: 100%;
`;
const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
`;
