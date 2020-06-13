import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import WelcomePage from "./WelcomePage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <WelcomePage />} />
      <Route exact path="/play/:username" render={() => <App />} />
    </BrowserRouter>
  );
};

export default MainRouter;
