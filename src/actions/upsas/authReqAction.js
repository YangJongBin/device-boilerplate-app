import { AUTH } from "../actionTypes";

export const reqAuth = () => {
  return {
    type: AUTH,
    promise: {
      method: "post",
      // url: "http://smapi.mynetgear.com:15401/app/auth/",
      url: "http://smapi.mynetgear.com:15401/app/auth/",
      data: ""
    }
  };
};
