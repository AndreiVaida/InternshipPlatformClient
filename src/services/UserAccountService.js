import axios from "axios";
import { SERVER_URL } from "../App";
import { UserType } from "../domain/UserType";
import EventEmitter from "../utils/EventEmitter";
import { EventType } from "../utils/EventType";

const AUTHORIZATION_TOKEN = "authorizationToken";
const USER = "user";

export class UserAccountService {
  
  static initializeAuthenticatedRequests() {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = localStorage.getItem(AUTHORIZATION_TOKEN);
      return config;
    }, error => {
      // handle the error
      return Promise.reject(error);
    });
  }

  static triggerUserChangedEvent() {
    EventEmitter.dispatch(EventType.UserAccountChanged);
  }

  static getLoggedUser() {
    return JSON.parse(localStorage.getItem(USER));
  }

  static isAuthenticated() {
    return localStorage.getItem(USER) != null && localStorage.getItem(AUTHORIZATION_TOKEN) != null;
  }

  static login(email, password, name) {
    const body = {
      email: email,
      password: password,
      name: name
    };

    return axios.post(SERVER_URL + "/login", body)
      .then(response => {
        UserAccountService.saveUserAccountInLocalStorage(response.data.User, response.data.Authorization);
        UserAccountService.triggerUserChangedEvent();
        return response;
      });
  };

  static saveUserAccountInLocalStorage (user, authorization) {
    localStorage.setItem(USER, JSON.stringify(user));
    localStorage.setItem(AUTHORIZATION_TOKEN, authorization);
  };

  static logout() {
    localStorage.removeItem(USER);
    localStorage.removeItem(AUTHORIZATION_TOKEN);
    UserAccountService.triggerUserChangedEvent();
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
