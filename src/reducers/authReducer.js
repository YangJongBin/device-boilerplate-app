import {AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE} from '../actions/actionTypes';

const defaultState = {
  isAuth: undefined,
  isVisibleSpinner: false,
  //로그인 된 사용자 정보
  userInfo: {
    main_seq: undefined,
    weather_location_seq: undefined,
    user_id: undefined,
    name: undefined,
    nick_name: undefined,
    grade: undefined,
    address: undefined,
    tel: undefined,
    main_uuid: undefined,
  },
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isVisibleSpinner: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        isVisibleSpinner: false,
        userInfo: action.result.data,
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        isAuth: false,
        isVisibleSpinner: false,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
