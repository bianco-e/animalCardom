import React, { useEffect } from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Spinner from "../components/Spinner";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserMe, createUser } from "../queries/user";
import { getNewUserTemplate } from "../utils";

export default function MenuLayout({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { push } = useHistory();

  useEffect(() => {
    if (isAuthenticated && user) {
      document.cookie = `auth=${user.sub}; max-age=43200; path=/;`;
      getUserMe(user.sub).then((res) => {
        if (res) {
          if (res.error && res.error === "user_not_found") {
            const newUser = getNewUserTemplate(user);
            createUser(newUser).then((userRes) => {
              if (!userRes && !userRes.auth_id) {
                push("/error");
              }
            });
          }
        }
      });
    }
  }, [isAuthenticated, user]); //eslint-disable-line

  return isLoading ? (
    <Spinner />
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
