import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "../components/Home";
import Hello from "../components/Hello";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/hello" component={Hello} />
      <Route component={Home} />
    </Switch>
  );
}