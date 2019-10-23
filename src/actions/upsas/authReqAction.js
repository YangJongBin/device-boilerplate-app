import { AUTH } from "../actionTypes";

export const reqAuth = () => {
  return {
    type: AUTH,
    promise: {
      method: "post",
      url: "http://192.168.0.154:8888/app/auth/",
      data: ""
    }
  };
};
