import { CHANGE_PLACE_FAILURE } from '../actions/actionTypes';

const defaultState = {
  selectedMainSeq: undefined // 현재 선택된 장소 정보
};

const mainSeqChangeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_PLACE_FAILURE:
      return {
        ...state,
        selectedMainSeq: action.promiseData.mainSeq
      };
    default:
      return state;
  }
};

export default mainSeqChangeReducer;
