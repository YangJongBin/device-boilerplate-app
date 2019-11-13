import { AUTH, LOGIN } from "../actionTypes";

export const reqAuth = () => {
  return {
    type: AUTH,
    promise: {
      method: "post",
      url: "http://smapi.mynetgear.com:15401/app/auth/",
      data: ""
    }
  };
};

export const reqLogin = (userid = "", password = "") => {
  return {
    type: LOGIN,
    promise: {
      method: "post",
      url: "http://smapi.mynetgear.com:15401/app/auth/login/",
      data: { userid, password }
    }
  };
};
