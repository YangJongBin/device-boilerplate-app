import {
  REPORT_DATA_REQUEST,
  REPORT_DATA_SUCCESS,
  REPORT_DATA_FAILURE
} from "../actions/actionTypes";

const defaultState = {
  reportDataInfo: {
    tableHeaderList: [],
    tableBodyList: []
  },
  isLading: true
};

const reportReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REPORT_DATA_REQUEST:
      return {
        ...state,
        isLading: true
      };
    case REPORT_DATA_SUCCESS:
      return {
        ...state,
        isLading: false,
        reportDataInfo: action.result.data
      };
    case REPORT_DATA_FAILURE:
      return {
        ...state,
        isLading: false
      };
    default:
      return state;
  }
};

export default reportReducer;
