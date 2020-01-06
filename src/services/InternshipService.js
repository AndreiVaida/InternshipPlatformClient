import axios from "axios";
import { SERVER_URL } from "../App";

export class InternshipService {

  static getInternships(filters) {
    let earliestStartDate = null;
    let latestEndDate = null;
    if (filters.earliestStartDate) {
      earliestStartDate = InternshipService.romanianDateToGlobalDate(filters.earliestStartDate);
    }
    if (filters.latestEndDate) {
      latestEndDate = InternshipService.romanianDateToGlobalDate(filters.latestEndDate);
    }

    const body = {
      industries: filters.industries,
      cities: filters.locations,
      earliestStartDate: earliestStartDate,
      latestEndDate: latestEndDate,
    };

    return axios.post(SERVER_URL + "/internship/filter", body)
      .then(internships => {
        for (let internship of internships.data) {
          internship.location = internship.city;
          internship.startDate = InternshipService.globalDateToRomanianDate(internship.startDate);
          internship.endDate = InternshipService.globalDateToRomanianDate(internship.endDate);
        }
        return internships.data
      });
  }

  static getFilterNames() {
    return axios.get(SERVER_URL + "/internship/filterName");
  }

  static addInternship(userId, name, industry, location, startDate, endDate, description) {
    const startDateFormatted = InternshipService.romanianDateToGlobalDate(startDate);
    const endDateFormatted = InternshipService.romanianDateToGlobalDate(startDate);

    const body = {
      companyId: userId,
      name: name,
      industry: industry,
      city: location,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      description: description
    };
    return axios.post(SERVER_URL + "/internship", body);
  }

  static getInternship(internshipId) {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    const startDate = new Date("02.03.2020".replace(pattern, '$3-$2-$1'));
    const endDate = new Date("03.04.2020".replace(pattern, '$3-$2-$1'));

    return new Promise((resolve, reject) => { // TODO: DELETE THIS after integration
      resolve({
        id: 1,
        name: "Java developer",
        industry: "IT",
        cities: "Cluj-Napoca",
        startDate: startDate,
        endDate: endDate,
        description: "Foarte interesant",
      });
    });

    // return axios.get(SERVER_URL + "/internship/" + internshipId);
  }

  static romanianDateToGlobalDate(romanianDate) {
    const array = romanianDate.split(".");
    return array[2] + "-" + array[1] + "-" + array[0];
  }

  static globalDateToRomanianDate(globalDate) {
    const array = globalDate.split("-");
    return array[2] + "." + array[1] + "." + array[0];
  }
}