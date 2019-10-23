import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE } from "../actions/actionTypes";

const defaultState = {
  path: "AuthScreen",
  isAuth: false,
  isLoading: true,
  siteInfo: {
    siteId: 0,
    siteName: ""
  },
  userInfo: {
    userId: "",
    name: ""
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
        isAuth: true,
        isLoading: false,
        siteInfo: action.result.data.siteId,
        userInfo: action.result.data.userInfo
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        path: "Login",
        isAuth: false,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
export default authReducer;
