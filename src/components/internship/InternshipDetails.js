import React, { Component } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { InternshipService } from "../../services/InternshipService";

export default class InternshipDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      industry: "",
      location: "",
      startDate: null,
      endDate: null,
      description: "",
    };

    this.loadInternship();
  }

  loadInternship = () => {
    InternshipService.getInternship(this.state.id)
      .then(response => {
        const internship = response.data;

        this.setState({
          name: internship.name,
          industry: internship.industry,
          location: internship.city,
          startDate: this.stringToDate(internship.startDate),
          endDate: this.stringToDate(internship.endDate),
          description: internship.description,
        });
      })
      .catch(error => {
        alert(error);
        return Promise.reject(error);
      });
  };

  stringToDate = (stringDate) => {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    return new Date(stringDate.replace(pattern, '$3-$2-$1'));
  };

  render() {
    return (
      <div className={"container mt-5 smallWidth"}>
        <p className={"display-4 mb-5 text-center"}> Internship details </p>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label> Internship name </Form.Label>
            <Form.Control type={"text"} name={"name"} value={this.state.name} placeholder={"No name"} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label> Industry </Form.Label>
            <Form.Control type={"text"} name={"industry"} value={this.state.industry} placeholder={"Industry unknown"} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label> Location </Form.Label>
            <Form.Control type={"text"} name={"location"} value={this.state.location} placeholder={"Location unknown"} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label> Start date </Form.Label> <br/>
            <DatePicker
              value={this.state.startDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              clearIcon={null}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> End date </Form.Label> <br/>
            <DatePicker
              value={this.state.endDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              clearIcon={null}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Description </Form.Label>
            <Form.Control type={"text"} as="textarea" name={"description"} value={this.state.description} placeholder={"No description"} readOnly />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
