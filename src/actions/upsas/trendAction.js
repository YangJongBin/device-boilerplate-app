import { TREND_DATA, SAVE_SITEID } from "../actionTypes";

export const reqTrendData = (
  siteId,
  searchType = "",
  searchInterval = "",
  strStartDateInputValue = "",
  strEndDateInputValue = ""
) => {
  return {
    type: TREND_DATA,
    promise: {
      method: "get",
      url: `http://smapi.mynetgear.com:15401/app/trend/${siteId}?seartchType=${searchType}&searchInterval=${searchInterval}&strStartDateInputValue=${strStartDateInputValue}&strEndDateInputValue=${strEndDateInputValue}`
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
