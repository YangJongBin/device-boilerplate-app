import { TREND_DATA } from "../actionTypes";

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
