import { CHANGE_TREND_SEARCHINFO_REQUEST } from "../../actions/actionTypes";
const defaultState = {};

const trendSearchReucer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_TREND_SEARCHINFO_REQUEST:
      return {
        ...state,
        changedSearchInfo: action.promise.data
      };

    default:
      return state;
  }
};

export default trendSearchReucer;
