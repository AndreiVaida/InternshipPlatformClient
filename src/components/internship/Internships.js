import React, { Component } from "react";
import { InternshipService } from "../../services/InternshipService";
import ListGroup from "react-bootstrap/ListGroup";
import history from "../../navigation/History";

class Internships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
    };
    this.loadInternships();
  }

  loadInternships = () => {
    InternshipService.getInternships()
      .then(internships => {
        this.setState({
          internships: internships
        });
      })
      .catch(error => {
        alert(error);
        return Promise.reject(error);
      });
  };

  goToInternshipPage = (internship) => {
    history.push("/internship/" + internship.id);
  };

  render() {
    return (
      <div className={"container"}>
        <div className={"text-center display-4 mb-5"}> Available internships</div>
        {
          this.state.internships.length === 0 ?
            <div className={"text-center"}>No internships available</div>
            :
            <ListGroup>
              {
                this.state.internships.map(internship => {
                  return (
                    <ListGroup.Item key={internship.id} className={"clickable darkenHover_80"} onClick={() => this.goToInternshipPage(internship)}>
                      <div className={"h4"}>{internship.name}</div>
                      <div className={"h6"}>Industry: {internship.industry}</div>
                      <div>
                        <img src={"locationIcon.png"} className={"smallIcon dark mr-1 pb-1"} />{internship.location},
                        <img src={"baseline_calendar_today_black_18dp.png"} className={"smallIcon ml-2 pb-1"} /> {internship.startDate} - {internship.endDate}
                      </div>
                    </ListGroup.Item>
                  );
                })
              }
            </ListGroup>
        }
      </div>
    );
  }
}

export default Internships;