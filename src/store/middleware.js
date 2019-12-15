import axios from "axios";
import { Alert } from "react-native";

export default () => {
  return next => action => {
    const { promise, type, ...rest } = action;

    next({ ...rest, promise, type: `${type}_REQUEST` });

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
