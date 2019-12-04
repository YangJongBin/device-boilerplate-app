import { SAVE_SITEID } from "./actionTypes";

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
