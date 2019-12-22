import axios from "axios";
import { SERVER_URL } from "../App";

export class UserAccountService {

  static login(email, password, name) {
    const body = {
      email: email,
      password: password,
      name: name
    };

    return axios.post(SERVER_URL + "/user", body)
      .then(response => {
        UserAccountService.saveUserAccountInLocalStorage(response.user, response.Authorization);
        UserAccountService.sendUserUpdateNotification();
        return response;
      });
  };

  static saveUserAccountInLocalStorage (user, authorization) {
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

  static createAccount(userType, email, password, name) {
    const body = {
      userType: userType,
      email: email,
      password: password,
      name: name
    };

    return axios.post(SERVER_URL + "/user", body);
  }
}
