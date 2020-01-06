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
    this.loadFilters()
      .finally(() => this.loadInternships());
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
    return this.stringToDate(stringDate);
  };

  stringToDate = (stringDate) => {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    return new Date(stringDate.replace(pattern, '$3-$2-$1'));
  };

  updateFiltersUrl = () => {
    const selectedFilters = this.getSelectedFilters();
    const urlParams = queryString.stringify(selectedFilters, {arrayFormat: 'comma'});
    let url = this.props.location.pathname;
    if (urlParams.length > 0) {
      url += "?" + urlParams;
    }
    
    window.history.pushState(null, 'Title', url);
  };

  /**
   *  Load filter names from server and update their values by the page url.
   * */
  loadFilters = () => {
    let promiseResolve, promiseReject;

    InternshipService.getFilterNames()
      .then(response => {
        const filterNames = response.data;

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
        promiseResolve("Filters loaded");

      })
      .catch(error => {
        alert(error);
        return Promise.reject(error);
      });

    return new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });
  };

  loadInternships = () => {
    InternshipService.getInternships(this.getSelectedFilters())
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

  /**
   *  @return a filter object with the selected filter names from state (by category)
   *  Date objects used the format: dd.MM.yyy.
   *  Example: filters: {"industries":["IT","Cleaning"],"locations":["Cluj-Napoca"],"earliestStartDate":"01.02.2020"}
   * */
  getSelectedFilters = () => {
    const selectedFilters = {
      industries: [],
      locations: [],
    };
    const filters = this.state.filters;
    for (const filterCategory in filters) {
      if (!Array.isArray(filters[filterCategory])) {
        continue;
      }
      for (const filter of filters[filterCategory]) {
        if (filter.checked) {
          if (Object.prototype.hasOwnProperty.call(selectedFilters, filterCategory)) {
            selectedFilters[filterCategory].push(filter.name);
          } else {
            selectedFilters[filterCategory] = [filter.name];
          }
        }
      }
    }

    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    if (filters.earliestStartDate) {
      selectedFilters.earliestStartDate = filters.earliestStartDate.toLocaleDateString("ro-RO", dateOptions);
    }
    if (filters.latestEndDate) {
      selectedFilters.latestEndDate = filters.latestEndDate.toLocaleDateString("ro-RO", dateOptions);
    }
    return selectedFilters;
  };

  goToInternshipPage = (internship) => {
    history.push("/internship/" + internship.id);
  };

  onFilterChanged = (filterCategory, filterIndex, event) => {
    const checked = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const filters = this.state.filters;
    filters[filterCategory][filterIndex].checked = checked;
    this.setState({
      filters: filters
    });
    this.loadInternships();
    this.updateFiltersUrl();
  };

  onDateFilterChanged = (datePickerName, date) => {
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

    this.loadInternships();
    this.updateFiltersUrl();
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
              this.state.filters.industries.map((industry, index) => {
                return (
                  <div key={industry.name}>
                    <input type="checkbox" checked={industry.checked} onChange={event => this.onFilterChanged("industries", index, event)}/> {industry.name}
                  </div>
                );
              })
            }
          </ListGroup.Item>
          <ListGroup.Item>
            <div className={"h6"}> Location</div>
            {
              this.state.filters.locations.map((location, index) => {
                return (
                  <div key={location.name}>
                    <input type="checkbox" checked={location.checked} onChange={event => this.onFilterChanged("locations", index, event)} /> {location.name}
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
              onChange={date => this.onDateFilterChanged("startDate", date)}
            />
            <br/>
            <label>Latest end date:</label> <br/>
            <DatePicker
              value={this.state.filters.latestEndDate}
              format={"dd.MM.yyy"}
              calendarIcon={null}
              onChange={date => this.onDateFilterChanged("endDate", date)}
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