import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { UserAccountService } from "../../services/UserAccountService";
import history from "../../navigation/History";
import { InternshipService } from "../../services/InternshipService";
import { UserType } from "../../domain/UserType";

export default class AddInternship extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      industry: "",
      location: "",
      startDate: null,
      endDate: null,
      description: "",
    };
    this.user = UserAccountService.getLoggedUser();
    this.validateUserType();
  }

  validateUserType = () => {
    if (!this.user || this.user.userType !== UserType.COMPANY) {
      history.push("/internships");
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  onDateChanged = (datePickerName, date) => {
    // eslint-disable-next-line default-case
    switch (datePickerName) {
      case "startDate": {
        this.setState({
          startDate: date,
        });
        break;
      }
      case "endDate": {
        this.setState({
          endDate: date,
        });
        break;
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();

    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const startDate = this.state.startDate.toLocaleDateString("ro-RO", dateOptions);
    const endDate = this.state.endDate.toLocaleDateString("ro-RO", dateOptions);
    InternshipService.addInternship(this.user.id, this.state.name, this.state.industry, this.state.location, startDate, endDate, this.state.description)
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
        <p className={"display-4 mb-5 text-center"}> Add an internship </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> Internship name </Form.Label>
            <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"Internship name"} required="required" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Industry </Form.Label>
            <Form.Control type={"text"} name={"industry"} value={this.state.industry} placeholder={"Industry"} required="required" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Location </Form.Label>
            <Form.Control type={"text"} name={"location"} value={this.state.location} placeholder={"Location"} required="required" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Start date </Form.Label> <br/>
            <DatePicker
              name={"startDate"}
              value={this.state.startDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              required={true}
              onChange={date => this.onDateChanged("startDate", date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> End date </Form.Label> <br/>
            <DatePicker
              name={"endDate"}
              value={this.state.endDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              required={true}
              onChange={date => this.onDateChanged("endDate", date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Description </Form.Label>
            <Form.Control type={"text"} name={"description"} value={this.state.description} placeholder={"Description"} onChange={this.handleInputChange} />
          </Form.Group>
          <div className={"text-center"}><Button type={"submit"}> Add the internship </Button></div>
        </Form>
      </div>
    );
  }
}
