import {TREND_DATA} from './actionTypes';

export const requestTrendData = (
  selectedMainSeq = '',
  searchType = '',
  searchInterval = '',
  selectStartDate = '',
  selectEndDate = '',
) => {
  return {
    type: TREND_DATA,
    promise: {
      method: 'get',
      url:
        'http://localhost:8888' +
        '/app/trend/' +
        `${selectedMainSeq}` +
        '?searchType=' +
        `${searchType}` +
        '&searchInterval=' +
        `${searchInterval}` +
        '&selectStartData=' +
        `${selectStartDate}` +
        '&selectEndData=' +
        `${selectEndDate}`,
      data: {},
    },
  };
};
