import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactHome from "../components/ReactHome";
import Hello from "../components/Hello";
import LoginForm from "../components/LoginForm";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LoginForm} />
      <Route path="/home" component={ReactHome} />
      <Route path="/hello" component={Hello} />
      <Route path="/login" component={LoginForm} />
      <Route component={ReactHome} />
    </Switch>
  );
}