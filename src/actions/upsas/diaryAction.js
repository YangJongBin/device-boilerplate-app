import { DIARY_DATA, SAVE_DIARYINFO, SAVE_DIARYLIST } from "../actionTypes";

export const reqDiaryData = () => {
  return {
    type: DIARY_DATA,
    promise: {
      method: "get",
      url: "http://smapi.mynetgear.com:15401/app/diary/",
      data: ""
    }
  };
};

export const saveDiaryInfo = diaryInfo => {
  return {
    type: SAVE_DIARYINFO,
    promise: {
      method: "post",
      url: "http://smapi.mynetgear.com:15401/app/diary/save/",
      data: diaryInfo
    }
  };
};

export const saveDiaryList = diaryList => {
  return {
    type: SAVE_DIARYLIST,
    promise: {
      method: "get",
      url: "",
      data: diaryList
    }
  };
};
