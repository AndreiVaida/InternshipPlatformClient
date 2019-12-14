import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css"
import {SERVER_URL} from "../App";
import history from "../navigation/History";
import axios from 'axios';

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

    const body = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };

    axios.post(SERVER_URL + "/login", body)
      .then(response => {
        if (response.ok) {
          history.push("/home");
        }
        else {
          alert("ȘTERGE ACEST IF FIINDCĂ NU AR TREBUI SĂ AJUNGI AICI");
        }
      })
      .catch(error => {
        alert(error);
        return Promise.reject(error);
      });
  };

  render() {
    return (
      <div className={"container mt-5 smallWidth"}>
        <p className={"display-4 mb-5 text-center"}> Login </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> Enter your e-mail </Form.Label>
            <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"E-mail"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Enter your password </Form.Label>
            <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"Password"} onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Login </Button></div>
        </Form>
      </div>
    );
  }
}


export default LoginForm;