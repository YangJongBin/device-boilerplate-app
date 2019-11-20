import {
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_FAILURE
} from "../actions/actionTypes";

const defaultState = {
  path: "AuthScreen",
  userInfo: {
    userId: "",
    name: "",
    siteList: [
      {
        siteId: "",
        siteName: ""
      }
    ]
  }
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        path: "App",
        siteList: action.result.data.siteList,
        userInfo: action.result.data.userInfo
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        path: "Login"
      };
    }
    default:
      return state;
  }
};
export default authReducer;
