import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const REACT_APP_0AUTH_DOMAIN = process.env.REACT_APP_0AUTH_DOMAIN;
  const REACT_APP_0AUTH_CLIENT_ID = process.env.REACT_APP_0AUTH_CLIENT_ID;
  const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  return (
    <Auth0Provider
      domain={REACT_APP_0AUTH_DOMAIN!}
      clientId={REACT_APP_0AUTH_CLIENT_ID!}
      redirectUri={REACT_APP_REDIRECT_URI!}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
