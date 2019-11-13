import { SAVE_SITEID_REQUEST, SAVE_SITEID_SUCCESS, SAVE_SITEID_FAILURE } from "../../actions/actionTypes";

const defaultState = {
  siteId: ""
};

const siteIdSaveReducer = (state = defaultState, action) => {
  switch (action.type) {
    // case SAVE_SITEID_REQUEST:
    //   return {
    //     ...state
    //   };
    case SAVE_SITEID_SUCCESS:
      return {
        ...state,
        siteId: action.promise.data
      };
    // case SAVE_SITEID_FAILURE:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};

export default siteIdSaveReducer;
