import { AUTH, LOGIN, LOGOUT, SAVE_SITEID } from "../actionTypes";

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

export const reqLogout = () => {
  return {
    type: LOGOUT,
    promise: {
      method: "get",
      url: "http://smapi.mynetgear.com:15401/app/auth/logout/",
      data: ""
    }
  };
};

export const saveSiteId = (siteId = "") => {
  return {
    type: SAVE_SITEID,
    promise: {
      method: "",
      url: "",
      data: siteId
    }
  };
};
