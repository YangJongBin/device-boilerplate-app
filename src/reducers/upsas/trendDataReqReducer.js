import { TREND_DATA_FAILURE, TREND_DATA_REQUEST, TREND_DATA_SUCCESS } from "../../actions/actionTypes";

const defaultState = {
  trendDataInfo: {
    inverterTrendList: [],
    sensorTrendList: []
  },
  isLoading: true
};

const trendDataReqReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TREND_DATA_REQUEST:
      return {
        ...state
      };
    case TREND_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trendDataInfo: action.result.data
      };
    case TREND_DATA_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default trendDataReqReducer;
