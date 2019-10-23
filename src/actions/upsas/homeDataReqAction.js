import { HOME_DATA } from "../actionTypes";

export const reqHomeData = (mainSeq = "") => {
  return {
    type: HOME_DATA,
    promise: {
      method: "get",
      url: "http://192.168.0.154:8888/app/home",
      data: ""
    }
  };
};
