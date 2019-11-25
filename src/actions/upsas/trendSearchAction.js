import { CHANGE_TREND_SEARCHINFO } from "../actionTypes";

export const changeSearchInfo = changedSearchInfo => {
  return {
    type: CHANGE_TREND_SEARCHINFO,
    promise: {
      method: "",
      url: "",
      data: changedSearchInfo
    }
  };
};
