import axios from "axios";
import { SERVER_URL } from "../App";

export class InternshipService {

  static getInternships() {
    return new Promise((resolve, reject) => {
      resolve([
        {id: 1, name: "Java developer", industry: "IT", location: "Cluj-Napoca", startDate: "1 iunie 2020", endDate: "5 iunie 2020"},
        {id: 2, name: "C# developer", industry: "IT", location: "Cluj-Napoca", startDate: "20 iunie 2020", endDate: "31 iunie 2020"},
        {id: 3, name: "Spălător de podele", industry: "Cleaning", location: "Cluj-Napoca", startDate: "1 ianuarie 2020", endDate: "5 iunie 2021"},
      ]);
    });
    // return axios.post(SERVER_URL + "/internship");
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