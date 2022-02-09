import React from "react";
import ChatBox from "./components/ChatBox";
import Lobby from "./components/Lobby";
import SignInOrUp from "./components/SignInOrUp";
import { BrowserRouter as Router, Route } from "react-router-dom";


const APP = () => (
  <Router>
    <Route path="/" exact component={SignInOrUp} />
    <Route path="/chat" component={ChatBox} />
    <Route path="/lobby" component={Lobby} />
  </Router>
);

export default APP;
