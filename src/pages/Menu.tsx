import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Menu() {
  const [loggedUser, setLoggedUser] = useState({ name: "" });
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();
  useEffect(() => {
    console.log({ user });
    if (isAuthenticated) {
      setLoggedUser(user);
    }
  }, [isAuthenticated]);
  console.log(useAuth0());

  return isLoading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <div>
      <h5>Name: {loggedUser.name}</h5>
      <h2>is auth: {isAuthenticated}</h2>
      {user && <h5>{user.name}</h5>}
    </div>
  );
}

const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
`;
