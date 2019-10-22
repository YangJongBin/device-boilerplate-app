import { combineReducers } from "redux";

import authReducer from "./authReducer";
import loginReducer from "./loginReducer";
import mainDataReqReducer from "./upsas/mainDataReqReducer";
import trendDataReqReducer from "./upsas/trendDataReqReducer";
import mainSeqChangeReducer from "./upsas/mainSeqChangeReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  loginReducerInfo: loginReducer,
  mainDataReqReducerInfo: mainDataReqReducer,
  trendDataReqReducerInfo: trendDataReqReducer,
  mainSeqChangeReducerInfo: mainSeqChangeReducer
});
