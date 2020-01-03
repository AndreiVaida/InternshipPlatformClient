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
}