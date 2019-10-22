import {MAIN_DATA} from './actionTypes';

export const requestMainData = (mainSeq = '') => {
  return {
    type: MAIN_DATA,
    promise: {
      method: 'get',
      url: 'http://localhost:8888/app/main/' + `${mainSeq}`,
      data: '',
    },
  };
};
