import axios from "axios";
import { restElement } from "@babel/types";

export default () => {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (type === "SAVE_SITEID") {
      return next({ ...rest, promise, type: `${type}_SUCCESS` });
    }

    next({ ...rest, type: `${type}_REQUEST` });

    return axios({
      method: promise.method,
      url: promise.url,
      data: promise.data
    })
      .then(result => {
        next({ ...rest, result, type: `${type}_SUCCESS` });
      })
      .catch(error => {
        next({ ...rest, error, type: `${type}_FAILURE` });
      });
  };
};
