import React, { Component } from "react";
import { InternshipService } from "../../services/InternshipService";
import ListGroup from "react-bootstrap/ListGroup";
import history from "../../navigation/History";
import DatePicker from 'react-date-picker';
import "./Internship.css"

const queryString = require('query-string');

class Internships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      filters: {
        industries: [], // array of pair {name, checked}
        locations: [],  // array of pair {name, checked}
        earliestStartDate: null,
        latestEndDate: null,
      },
      urlFilters: null,
    };
  }

  componentDidMount() {
    this.loadUrlFilters();
    this.loadFilters();
    this.loadInternships();
  }

  loadUrlFilters = () => {
    const urlFilters = queryString.parse(this.props.location.search, {arrayFormat: 'comma'});
    this.setState({
      urlFilters: urlFilters
    });
  };

  /**
   *  @param filterCategory: 'industry', 'location' etc.
   *  @param filterName: 'IT', 'Cleaning', 'Cluj-Napoca', 'București' etc.
   **/
  isInUrlFilters = (filterCategory, filterName) => {
    const urlFilters = this.state.urlFilters;
    if (!Object.prototype.hasOwnProperty.call(urlFilters, filterCategory)) {
      return false;
    }
    const categoryFilters = urlFilters[filterCategory];
    return categoryFilters.includes(filterName);
  };

  getDateFromUrlFilters = (dateName) => {
    const urlFilters = this.state.urlFilters;
    const stringDate = urlFilters[dateName];
    if (!stringDate) {
      return null;
    }

    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    const date = new Date(stringDate.replace(pattern,'$3-$2-$1'));
    console.log(date);
    return date;
  };

  /**
   *  Load filter names from server and update their values by the page url.
   * */
  loadFilters = () => {
    InternshipService.getFilterNames()
      .then(filterNames => {

        const filters = {
          industries: [],
          locations: [],
          earliestStartDate: this.getDateFromUrlFilters("earliestStartDate"),
          latestEndDate: this.getDateFromUrlFilters("latestEndDate"),
        };
        for (const filterCategory in filterNames) {
          if (Object.prototype.hasOwnProperty.call(filterNames, filterCategory)) {
            for (const filterName of filterNames[filterCategory]) {
              const checked = this.isInUrlFilters(filterCategory, filterName);
              filters[filterCategory].push({name: filterName, checked: checked});
            }
          }
        }
        this.setState({
          filters: filters,
        });

      })
      .catch(error => {
        alert(error);
        return Promise.reject(error);
      });
  };

  loadInternships = () => {
    InternshipService.getInternships()
      .then(internships => {
        this.setState({
          internships: internships,
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

  onDateChanged = (datePickerName, date) => {
    console.log(date);
    const filters = this.state.filters;
    // eslint-disable-next-line default-case
    switch (datePickerName) {
      case "startDate": {
        filters.earliestStartDate = date;
        break;
      }
      case "endDate": {
        filters.latestEndDate = date;
        break;
      }
    }
    this.setState({
      filters: filters,
    });
  };

  render() {
    return (
      <div className={"container"}>
        <div className={"text-center display-4 mb-5"}> Available internships</div>
        {/* Filters */}
        <ListGroup className={"position-absolute"} style={{left: 0}}>
          <ListGroup.Item>
            <label className={"h6"}> Discover appropriate <br/> internships for You </label>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className={"h6"}> Industry</div>
            {
              this.state.filters.industries.map(industry => {
                return (
                  <div key={industry.name}>
                    <input type="checkbox" defaultChecked={industry.checked} /> {industry.name}
                  </div>
                );
              })
            }
          </ListGroup.Item>
          <ListGroup.Item>
            <div className={"h6"}> Location</div>
            {
              this.state.filters.locations.map(location => {
                return (
                  <div key={location.name}>
                    <input type="checkbox" defaultChecked={location.checked} /> {location.name}
                  </div>
                );
              })
            }
          </ListGroup.Item>
          <ListGroup.Item>
            <div className={"h6"}> Period</div>
            <label>Earliest start date:</label> <br/>
            <DatePicker
              value={this.state.filters.earliestStartDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              onChange={date => this.onDateChanged("startDate", date)}
            />
            <br/>
            <label>Latest end date:</label> <br/>
            <DatePicker
              value={this.state.filters.latestEndDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              onChange={date => this.onDateChanged("endDate", date)}
            />
          </ListGroup.Item>
        </ListGroup>
        {/* Available internships */}
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
                        <img src={"locationIcon.png"} className={"smallIcon dark mr-1 pb-1"}/>{internship.location},
                        <img src={"baseline_calendar_today_black_18dp.png"} className={"smallIcon ml-2 pb-1"}/> {internship.startDate} - {internship.endDate}
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