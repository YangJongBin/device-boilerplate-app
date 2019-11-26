import {
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/actionTypes";

const defaultState = {
  isLoggedIn: false,
  isLoading: true,
  naviPath: "AuthScreen",
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
        ...state,
        isLoggedIn: false,
        isLoading: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        naviPath: "App",
        siteList: action.result.data.siteList,
        userInfo: action.result.data.userInfo
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        naviPath: "Login"
      };
    }
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        naviPath: "Login"
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        naviPath: "AuthScreen"
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        naviPath: "Login"
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: true,
        naviPath: "More"
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        naviPath: "Login"
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        naviPath: "More"
      };
    default:
      return state;
  }
};
export default authReducer;
