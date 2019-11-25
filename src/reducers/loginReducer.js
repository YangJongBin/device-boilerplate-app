import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/actionTypes";

const defaultState = {
  isLoggedIn: undefined, // 로그인 상태
  path: "Login"
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: undefined
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        path: "AuthScreen"
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        paht: "Login"
      };
    default:
      return state;
  }
};

export default loginReducer;
