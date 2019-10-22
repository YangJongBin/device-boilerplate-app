import { MAIN_DATA } from "../actionTypes";

export const requestMainData = (mainSeq = "") => {
  return {
    type: MAIN_DATA,
    promise: {
      method: "get",
      url: "http://192.168.0.154:8888/",
      data: ""
    }
  };
};
