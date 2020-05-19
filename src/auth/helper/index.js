import { API } from "../../backend";
import axios from "axios";

const signup = (user) => {
  return axios
    .post(`${API}/auth/signup`, user, {
      responseType: "json",
    })
    .then((response) => response.data)
    .catch((err) => {
      const errorMsg = Object.assign({}, err);
      return errorMsg.response.data;
    });
};

const signin = (user) => {
  return axios
    .post(`${API}/auth/signin`, user)
    .then((response) => response.data)
    .catch((err) => {
      // console.log(err);
      const errorMsg = Object.assign({}, err);
      return errorMsg.response.data;
    });
};

const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return axios(`${API}/auth/signout`)
      .then((response) => console.log("sign out success"))
      .catch((err) => console.log(err));
  }
};

const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export { signup, signin, authenticate, isAuthenticated, signout };
