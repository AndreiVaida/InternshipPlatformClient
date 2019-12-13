import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css"

class LoginForm extends Component {
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

  render() {
    return (
      <div className={"container background"}>
        <Form>
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
          <Button type={"submit"}> Create your account</Button>
        </Form>
      </div>
    );
  }
}


export default LoginForm;