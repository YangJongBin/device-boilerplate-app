import {
  HOME_DATA_REQUEST,
  HOME_DATA_SUCCESS,
  HOME_DATA_FAILURE
} from "../actions/actionTypes";

const defaultState = {
  // home 화면에 보여줄 데이터
  homeDataInfo: {
    weatherCastInfo: {
      tmp: 0,
      ws: 0,
      inclinedSolar: 0,
      wf: 0
    },
    //발전량 데이터
    powerGenerationInfo: {
      currkW: 0, //현재 발전량
      currKwMax: 0, //  최대 발전량
      dailyPower: 0, // 금일 발전량
      monthPower: 0, // 당월 발전량
      comulativePower: 0 // 누적 발전량
    },
    growthEnvChartInfo: {
      lux: 0,
      co2: 0,
      soilWaterValue: 0,
      soilTemperature: 0,
      soilReh: 0,
      outsideAirTemperature: 0,
      outsideAirReh: 0,
      inclinedSolar: 0
    }
  },
  isLoading: true // 로딩 화면 상태
};

const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HOME_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case HOME_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeDataInfo: action.result.data
      };
    case HOME_DATA_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default homeReducer;
