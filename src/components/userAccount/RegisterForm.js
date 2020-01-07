import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import "../../App.css"
import history from "../../navigation/History";
import { UserAccountService } from "../../services/UserAccountService";
import { UserType } from "../../domain/UserType";
import Tab from "react-bootstrap/Tab";
import { EducationDegree } from "../../domain/EducationDegree";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import FadeIn from 'react-fade-in';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      educationDegrees: [EducationDegree.Associate, EducationDegree.Bachelor, EducationDegree.Master, EducationDegree.Doctoral, EducationDegree.Professional],
      educations: [],
    };
  }

  componentDidMount() {
    this.addEducationItem();
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleEducationInputChange = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    let educations = this.state.educations;
    educations[index][name] = value;

    this.setState({
      educations: educations
    });
  };

  addEducationItem = () => {
    const educations = this.state.educations;
    educations.push({degree: null, institutionName: "", specialization: "", description: ""});
    this.setState({
      educations: educations
    });
  };

  removeEducationItem(index) {
    const educations = this.state.educations;
    educations.splice(index, 1);
    this.setState({
      educations: educations
    });
  }

  onSubmit = (event, userType) => {
    event.preventDefault();
    const account = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };

    let userType_url;
    // eslint-disable-next-line default-case
    switch (userType) {
      case UserType.STUDENT: {
        userType_url = "student";
        account.educations = this.state.educations;
        for (const education of account.educations) {
          if (!education.degree) {
            alert("Select the education degree for '" + education.institutionName + "' (" + education.specialization + ")");
            return;
          }
        }
        break;
      }
      case UserType.COMPANY: {
        userType_url = "company";
        break;
      }
    }

    UserAccountService.createAccount(userType_url, account)
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
              <FadeIn>
              <Form.Group>
                <Form.Label> E-mail </Form.Label>
                <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"write your e-mail"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Password </Form.Label>
                <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"pick a strong password"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"your First Name and Last Name"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group className={"mt-5"}>
                <Form.Label className={"h4"}> Add education </Form.Label>
                {
                  this.state.educations.map((education, index) => {
                    return (
                      <div key={"Education" + index} className={"mb-3 lighterBackgroundHover p-2"}>
                        <Form.Label className={"mb-0 mt-1"}> Degree </Form.Label>
                        <Dropdown name={"degree"} options={this.state.educationDegrees} value={education.degree} placeholder="select the education degree" required="required"
                                  onChange={(value) => {
                                    const event = {target: {name: "degree", "value": value}};
                                    this.handleEducationInputChange(event, index);
                                  }}/>
                        <Form.Label className={"mb-0 mt-1"}> Institution name</Form.Label>
                        <Form.Control type={"text"} name={"institutionName"} value={education.institutionName} placeholder={"institution name"} required="required" onChange={(event) => this.handleEducationInputChange(event, index)}/>
                        <Form.Label className={"mb-0 mt-1"}> Specialization </Form.Label>
                        <Form.Control type={"text"} name={"specialization"} value={education.specialization} placeholder={"specialization"} required="required" onChange={(event) => this.handleEducationInputChange(event, index)}/>
                        <Form.Label className={"mb-0 mt-1"}> Description</Form.Label>
                        <Form.Control type={"text"} as="textarea" name={"description"} value={education.description} placeholder={"what have you realised here ?"}
                                      onChange={(event) => this.handleEducationInputChange(event, index)}/>
                        <label className={"text-danger clickable darkenHover mb-0 mt-2"} onClick={() => this.removeEducationItem(index)}> Remove </label>
                      </div>
                    );
                  })
                }
                <img src={"baseline_add_circle_outline_black_48dp.png"} alt={"Add"} onClick={this.addEducationItem} className={"clickable greyHover"}/>
              </Form.Group>
              <div className={"text-center"}><Button type={"submit"}> Create your account </Button></div>
              </FadeIn>
            </Form>
          </Tab>
          {/* Company */}
          <Tab eventKey="COMPANY" title="Company">
            <Form onSubmit={(event) => this.onSubmit(event, UserType.COMPANY)}>
              <FadeIn>
              <Form.Group>
                <Form.Label> E-mail </Form.Label>
                <Form.Control type={"email"} name={"email"} value={this.state.email} placeholder={"write company e-mail"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Password </Form.Label>
                <Form.Control type={"password"} name={"password"} value={this.state.password} placeholder={"pick a strong password"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"enter company name"} required="required" onChange={this.handleInputChange}/>
              </Form.Group>
              <div className={"text-center"}><Button type={"submit"}> Create company account </Button></div>
              </FadeIn>
            </Form>
          </Tab>
        </Tabs>

        <FadeIn delay={500}>
        <div className={"text-center mt-3"}>
          <a href={"/login"}> Already have an account? Login here! </a>
        </div>
        </FadeIn>
      </div>
    );
  }
}

export default RegisterForm;