import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Game from "./pages/Game";
import WelcomePage from "./pages/WelcomePage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <WelcomePage />} />
      <Route exact path="/play" render={() => <Game />} />
    </BrowserRouter>
  );
};

export default MainRouter;
