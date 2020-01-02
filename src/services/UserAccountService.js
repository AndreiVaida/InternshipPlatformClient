import axios from "axios";
import { SERVER_URL } from "../App";
import { UserType } from "../domain/UserType";

export class UserAccountService {

  static initializeAuthenticatedRequests() {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = localStorage.getItem("authorizationToken");
      return config;
    }, error => {
      // handle the error
      return Promise.reject(error);
    });
  }

  static login(email, password, name) {
    const body = {
      email: email,
      password: password,
      name: name
    };

    return axios.post(SERVER_URL + "/login", body)
      .then(response => {
        UserAccountService.saveUserAccountInLocalStorage(response.data.user, response.data.Authorization);
        UserAccountService.sendUserUpdateNotification();
        return response;
      });
  };

  static saveUserAccountInLocalStorage (user, authorization) {
    console.log("Authorization: " + authorization);
    console.log("user: " + user);
    localStorage.setItem("user", user);
    localStorage.setItem("authorizationToken", authorization);
  };

  static sendUserUpdateNotification() {
    console.log("NOTIFICĂ navigation bar-ul să actualizeze numele userului");
  };

  static logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authorizationToken");
  };

  static createAccount(userType, account) {
    // eslint-disable-next-line default-case
    switch (userType) {
      case UserType.STUDENT: {
        for (const education of account.educations) {
          education.degree = education.degree.value;
        }
      }
    }

    return axios.post(SERVER_URL + "/user/" + userType, account);
  }
}
