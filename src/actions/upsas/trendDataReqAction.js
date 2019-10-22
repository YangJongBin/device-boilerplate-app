import { TREND_DATA } from "../actionTypes";

export const reqTrendData = () => {
  return {
    type: TREND_DATA,
    promise: {
      method: "get",
      url: "http://192.168.0.154:8888/app/trend/",
      data: {}
    }
  };
};
