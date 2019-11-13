import {
  DIARY_DATA_REQUEST,
  DIARY_DATA_SUCCESS,
  DIARY_DATA_FAILURE,
  SAVE_DIARYINFO_REQUEST,
  SAVE_DIARYINFO_SUCCESS,
  SAVE_DIARYINFO_FAILURE,
  SAVE_DIARYLIST_REQUEST,
  SAVE_DIARYLIST_SUCCESS,
  SAVE_DIARYLIST_FAILURE
} from "../../actions/actionTypes";

const defaultState = {
  diaryDataList: [],
  isLoading: true
};

const diaryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DIARY_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DIARY_DATA_SUCCESS:
      return {
        ...state,
        diaryDataList: action.result.data,
        isLoading: false
      };
    case DIARY_DATA_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case SAVE_DIARYINFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SAVE_DIARYINFO_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case SAVE_DIARYINFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case SAVE_DIARYLIST_SUCCESS:
      return {
        ...state,
        stateDiaryList: action.promise.data
      };
    default:
      return {
        ...state
      };
  }
};

export default diaryReducer;
