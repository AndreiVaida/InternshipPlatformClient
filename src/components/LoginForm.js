import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css"
import {SERVER_URL} from "../App";
import history from "../navigation/History";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
      const hello = request.readyState;
      alert(hello);
      history.push("/home");
    });
    request.addEventListener('error', () => {
      const hello = "Error: " + JSON.stringify(request.readyState);
      alert(hello);
    });

    request.open('POST', SERVER_URL + "/login");
    request.send();
  };

  render() {
    return (
      <div className={"container mt-5 smallWidth"}>
        <p className={"display-4 mb-5 text-center"}> Login </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> Enter your e-mail </Form.Label>
            <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"e-mail"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Enter your password </Form.Label>
            <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"password"} onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Login </Button></div>
        </Form>
      </div>
    );
  }
}


export default LoginForm;