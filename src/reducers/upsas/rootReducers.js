import { combineReducers } from "redux";

import authReducer from "../authReducer";
import loginReducer from "../loginReducer";
import homeReducer from "./homeReducer";
import trendReducer from "./trendReducer";
import trendSearchReducer from "./trendSearchReducer";
import reportReducer from "./reportReducer";
import diaryReducer from "./diaryReducer";
import siteIdSaveReducer from "./siteIdSaveReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  loginReducerInfo: loginReducer,
  homeReducerInfo: homeReducer,
  trendReducerInfo: trendReducer,
  trendSearchReducerInfo: trendSearchReducer,
  reportReducerInfo: reportReducer,
  diaryReducerInfo: diaryReducer,
  siteIdSaveReducerInfo: siteIdSaveReducer
});
