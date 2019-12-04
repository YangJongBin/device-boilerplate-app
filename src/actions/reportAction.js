import { REPORT_DATA } from "./actionTypes";

export const reqReportData = (siteId = "", category = "") => {
  return {
    type: REPORT_DATA,
    promise: {
      method: "get",
      url: `http://smapi.mynetgear.com:15401/app/report/${siteId}/`
      // url: `http://smapi.mynetgear.com:15401/app/report/${siteId}/${category}`
    }
  };
};
