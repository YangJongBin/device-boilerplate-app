import { DIARY_DATA, SAVE_DIARYINFO, DELETE_DIARYINFO } from "./actionTypes";

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

export const deleteDiaryInfo = diaryInfo => {
  return {
    type: DELETE_DIARYINFO,
    promise: {
      method: "post",
      url: "http://smapi.mynetgear.com:15401/app/diary/delete/",
      data: diaryInfo
    }
  };
};
