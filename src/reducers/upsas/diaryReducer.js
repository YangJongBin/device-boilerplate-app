import {
  DIARY_DATA_REQUEST,
  DIARY_DATA_SUCCESS,
  DIARY_DATA_FAILURE,
  SAVE_DIARYINFO_REQUEST,
  SAVE_DIARYINFO_SUCCESS,
  SAVE_DIARYINFO_FAILURE,
  DELETE_DIARYINFO_REQUEST,
  DELETE_DIARYINFO_SUCCESS,
  DELETE_DIARYINFO_FAILURE
} from "../../actions/actionTypes";

const defaultState = {
  diaryInfo: {},
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
        diaryInfoToSave: action.promise.data,
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
    case DELETE_DIARYINFO_REQUEST:
      return {
        ...state,
        diaryInfoToDelete: action.promise.data,
        isLoading: true
      };
    case DELETE_DIARYINFO_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_DIARYINFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default diaryReducer;
