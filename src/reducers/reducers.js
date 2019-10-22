import { combineReducers } from "redux";

import authReducer from "./authReducer";
import loginReducer from "./loginReducer";
import mainDataReqReducer from "./mainDataReqReducer";
import trendDataReqReducer from "./trendDataReqReducer";
import mainSeqChangeReducer from "./mainSeqChangeReducer";

export default combineReducers({
  authReducerInfo: authReducer,
  loginReducerInfo: loginReducer,
  mainDataReqReducerInfo: mainDataReqReducer,
  trendDataReqReducerInfo: trendDataReqReducer,
  mainSeqChangeReducerInfo: mainSeqChangeReducer
});
