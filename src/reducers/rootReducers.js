import { combineReducers } from "redux";

import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import trendReducer from "./trendReducer";
import reportReducer from "./reportReducer";
import diaryReducer from "./diaryReducer";
import siteIdSaveReducer from "./siteIdSaveReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  homeReducerInfo: homeReducer,
  trendReducerInfo: trendReducer,
  reportReducerInfo: reportReducer,
  diaryReducerInfo: diaryReducer,
  siteIdSaveReducerInfo: siteIdSaveReducer
});
