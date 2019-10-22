import {AUTH} from './actionTypes';

export const requestAuth = () => {
  return {
    type: AUTH,
    promise: {
      method: 'post',
      url: 'http://localhost:8888/app/auth',
      data: '',
    },
  };
};
