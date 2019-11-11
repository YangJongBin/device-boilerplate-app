import { HOME_DATA } from "../actionTypes";

export const reqHomeData = (siteId = "") => {
  return {
    type: HOME_DATA,
    promise: {
      method: "get",
      // url: `http://smapi.mynetgear.com:15401/app/home/`,
      url: `http://smapi.mynetgear.com:15401/app/home/${siteId}`,
      data: ""
    }
  };
};
