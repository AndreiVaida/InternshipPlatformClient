import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactHome from "../components/demo/ReactHome";
import Hello from "../components/demo/Hello";
import RegisterForm from "../components/userAccount/RegisterForm";
import LoginForm from "../components/userAccount/LoginForm";
import Internships from "../components/internship/Internships";
import AddInternship from "../components/internship/AddInternship";
import InternshipDetails from "../components/internship/InternshipDetails";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Internships} />
      <Route path="/home" component={ReactHome} />
      <Route path="/hello" component={Hello} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/internships" component={Internships} />
      <Route path="/internship" exact component={AddInternship} />
      <Route path="/internship/:id" component={InternshipDetails} />
      <Route component={ReactHome} />
    </Switch>
  );
}