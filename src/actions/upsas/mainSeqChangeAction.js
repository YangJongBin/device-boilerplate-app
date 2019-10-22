import { CHANGE_PLACE } from "../actionTypes";

export const requestChangeMainSeq = mainSeq => {
  return {
    type: CHANGE_PLACE,
    promise: {
      method: "",
      url: "",
      data: { mainSeq }
    }
  };
};
