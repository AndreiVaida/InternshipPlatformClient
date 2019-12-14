import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css"
import {SERVER_URL} from "../App";
import history from "../navigation/History";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
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
      history.push("/login");
    });
    request.addEventListener('error', () => {
      const hello = "Error: " + JSON.stringify(request.readyState);
      alert(hello);
    });

    request.open('POST', SERVER_URL + "/user");
    request.send();
  };

  render() {
    return (
      <div className={"container mt-5 smallWidth"}>
        <p className={"display-4 mb-5 text-center"}> Create an account </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> Enter your e-mail </Form.Label>
            <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"e-mail"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Enter a password </Form.Label>
            <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"password"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Enter your name </Form.Label>
            <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"First Name and Last Name"} onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Create your account </Button></div>
        </Form>
      </div>
    );
  }
}


export default RegisterForm;