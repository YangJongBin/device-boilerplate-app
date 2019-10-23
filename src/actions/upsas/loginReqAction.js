import { LOGIN } from "../actionTypes";

export const requestLogin = (userid = "", password = "") => {
  return {
    type: LOGIN,
    promise: {
      method: "post",
      url: "http://localhost:8888/app/auth/login/",
      data: { userid, password }
    }
  };
};
