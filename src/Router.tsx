import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import WelcomePage from "./pages/WelcomePage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <WelcomePage />} />
      <Route exact path="/play" render={() => <Game />} />
      <Route exact path="/menu" render={() => <Menu />} />
    </BrowserRouter>
  );
};

export default MainRouter;
