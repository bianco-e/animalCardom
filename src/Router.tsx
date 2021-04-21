import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Game from "./pages/Game";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import WelcomePage from "./pages/WelcomePage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <WelcomePage />} />
      <Route exact path="/play" render={() => <Game />} />
      <Route exact path="/menu" render={() => <Menu />} />
      <Route exact path="/profile" render={() => <Profile />} />
      <Route exact path="/collection" render={() => <Collection />} />
    </BrowserRouter>
  );
};

export default MainRouter;
