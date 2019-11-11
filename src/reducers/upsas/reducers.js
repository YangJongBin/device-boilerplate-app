import { combineReducers } from "redux";

import authReducer from "../authReducer";
import loginReducer from "../loginReducer";
import homeDataReqReducer from "./homeDataReqReducer";
import trendDataReqReducer from "./trendDataReqReducer";
import reportDataReqReducer from "./reportDataReqReducer";
import siteIdSaveReducer from "./siteIdSaveReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  loginReducerInfo: loginReducer,
  homeDataReqReducerInfo: homeDataReqReducer,
  trendDataReqReducerInfo: trendDataReqReducer,
  reportDataReqReducerInfo: reportDataReqReducer,
  siteIdSaveReducerInfo: siteIdSaveReducer
});
