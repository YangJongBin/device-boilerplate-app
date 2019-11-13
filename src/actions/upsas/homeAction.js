import { HOME_DATA, SAVE_SITEID } from "../actionTypes";

export const reqHomeData = (siteId = "") => {
  return {
    type: HOME_DATA,
    promise: {
      method: "get",
      url: `http://smapi.mynetgear.com:15401/app/home/${siteId}`,
      data: ""
    }
  };
};

export const saveSiteId = siteId => {
  return {
    type: SAVE_SITEID,
    promise: {
      method: "",
      url: "",
      data: siteId
    }
  };
};
