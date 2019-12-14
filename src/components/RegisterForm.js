import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css"
import {SERVER_URL} from "../App";
import history from "../navigation/History";
import axios from 'axios';

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

    const body = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };

    axios.post(SERVER_URL + "/user", body)
      .then(response => {
        if (response.ok) {
          history.push("/login");
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
        <p className={"display-4 mb-5 text-center"}> Create an account </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> E-mail </Form.Label>
            <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"write your e-mail"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Password </Form.Label>
            <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"pick a strong password"} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Name </Form.Label>
            <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"enter your First Name and Last Name"} onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Create your account </Button></div>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;