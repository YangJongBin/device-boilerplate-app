import { combineReducers } from "redux";

import authReducer from "../authReducer";
import loginReducer from "../loginReducer";
import homeDataReqReducer from "./homeDataReqReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  loginReducerInfo: loginReducer,
  homeDataReqReducerInfo: homeDataReqReducer
});
