import { TREND_DATA, SAVE_SITEID } from "../actionTypes";

export const reqTrendData = siteId => {
  return {
    type: TREND_DATA,
    promise: {
      method: "get",
      url: `http://smapi.mynetgear.com:15401/app/trend/${siteId}`,
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
