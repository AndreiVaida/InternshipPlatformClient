import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../../App.css"
import history from "../../navigation/History";
import { UserAccountService } from '../../services/UserAccountService'
import FadeIn from "react-fade-in";

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

    UserAccountService.login(this.state.email, this.state.password, this.state.name)
      .then(() => {
        history.push("/internships");
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
          <FadeIn>
          <Form.Group>
            <Form.Label> Enter your e-mail </Form.Label>
            <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"E-mail"} required="required" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Enter your password </Form.Label>
            <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"Password"} required="required" onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Login </Button></div>
          </FadeIn>
        </Form>
        <FadeIn delay={500}>
        <div className={"text-center mt-3"}>
          <a href={"/register"}> Don't have an account? Create one here! </a>
        </div>
        </FadeIn>
      </div>
    );
  }
}


export default LoginForm;