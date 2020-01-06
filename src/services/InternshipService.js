import axios from "axios";
import { SERVER_URL } from "../App";

export class InternshipService {

  static getInternships(filters) {
    console.log("filters: " + JSON.stringify(filters)); // TODO: DELETE THIS after integration
    return new Promise((resolve, reject) => {
      const internships = [
        {id: 1, name: "Java developer", industry: "IT", location: "Cluj-Napoca", startDate: "1 iunie 2020", endDate: "5 iunie 2020"},
        {id: 2, name: "C# developer", industry: "IT", location: "Cluj-Napoca", startDate: "20 iunie 2020", endDate: "31 iunie 2020"},
        {id: 3, name: "Spălător de podele", industry: "Cleaning", location: "Cluj-Napoca", startDate: "1 ianuarie 2020", endDate: "5 iunie 2021"},
        {id: 4, name: "Grădinar", industry: "Casă și Grădinărit", location: "Cluj-Napoca", startDate: "1 iulie 2020", endDate: "5 iunie 2021"},
      ];
      InternshipService.shuffleArray(internships);
      resolve(internships);
    });
    // return axios.post(SERVER_URL + "/internship", filters);
  }

  static shuffleArray(array) { // TODO: DELETE THIS after integration
    for (let i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  static getFilterNames() {
    return new Promise((resolve, reject) => {
      resolve({
        industries: ["IT", "Cleaning", "Photography"],
        locations: ["Cluj-Napoca", "București"],
      });
    });
    // return axios.post(SERVER_URL + "/internship/filterName");
  }

  static addInternship(userId, name, industry, location, startDate, endDate, description) {
    const startDateFormatted = InternshipService.romanianDateToGlobalDate(startDate);
    const endDateFormatted = InternshipService.romanianDateToGlobalDate(startDate);

    const body = {
      userId: userId,
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
        location: "Cluj-Napoca",
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