import React, { useEffect, useState } from "react";
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
  }, []);
  console.log(useAuth0());

  return (
    <div>
      <h5>Name: {loggedUser.name}</h5>
    </div>
  );
}
