import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import "../App.css"
import history from "../navigation/History";
import { UserAccountService } from "../services/UserAccountService";
import { UserType } from "../domain/UserType";
import Tab from "react-bootstrap/Tab";

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

  onSubmit = (event, userType) => {
    event.preventDefault();
    UserAccountService.createAccount(userType, this.state.email, this.state.password, this.state.name)
      .then(() => {
        history.push("/login");
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

        <Tabs defaultActiveKey="STUDENT" className={"Tabs"}>
          {/* Student */}
          <Tab eventKey="STUDENT" title="Student">
            <Form onSubmit={(event) => this.onSubmit(event, UserType.STUDENT)}>
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
          </Tab>
          {/* Company */}
          <Tab eventKey="COMPANY" title="Company">
            <Form onSubmit={(event) => this.onSubmit(event, UserType.COMPANY)}>
              <Form.Group>
                <Form.Label> E-mail </Form.Label>
                <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"write company e-mail"} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Password </Form.Label>
                <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"pick a strong password"} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"enter company name"} onChange={this.handleInputChange} />
              </Form.Group>
              <div className={"text-center"}><Button type={"submit"}> Create company account </Button></div>
            </Form>
          </Tab>
        </Tabs>

        <div className={"text-center mt-3"}>
          <a href={"/login"}> Already have an account? Login here! </a>
        </div>
      </div>
    );
  }
}

export default RegisterForm;