import React, { Component } from "react";
import { HashRouter as Routes, Route, Switch } from "react-router-dom";
import Main from "./client/components/Main";

export default class Routers extends Component {
  render() {
    return (
      <React.Fragment>
        <Routes>
          <Switch>
            <Route exact path="/:id" component={Main} />
            <Route exact path="/" component={Main} />
          </Switch>
        </Routes>
      </React.Fragment>
    );
  }
}
