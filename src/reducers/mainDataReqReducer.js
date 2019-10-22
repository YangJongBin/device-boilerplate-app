import { MAIN_DATA_REQUEST, MAIN_DATA_SUCCESS, MAIN_DATA_FAILURE } from "../actions/actionTypes";

const defaultState = {
  mainDataInfo: {
    // 해더 정보
    headerInfo: {
      // 환경 정보
      headerEnv: {
        currWeatherCastInfo: {
          inclinedSolar: 0,
          ws: 0,
          wf: 0,
          temp: 0
        }
      },
      // 장소 정보
      headerMenu: {
        naviId: undefined,
        siteId: undefined,
        siteList: [
          {
            name: "",
            siteId: "",
            m_name: ""
          }
        ]
      }
    },
    // 메인데이터 중 메인화면에 보여줄 데이터
    containerInfo: {
      //발전량 데이터
      powerGenerationInfo: {
        currKw: 0, //현재 발전량
        currKwYaxisMax: 0, //  최대 발전량
        dailyPower: 0, // 금일 발전량
        monthPower: 0, // 당월 발전량
        comulativePower: 0, // 누적 발전량
        hasOperationInverter: false,
        hasAlarm: false
      },
      //생육환경 차트 데이터
      growthEnv: {
        lux: 1576.4,
        co2: 388,
        soilWaterValue: 44.6,
        soilTemperature: 25.8,
        soilReh: 58,
        outsideAirTemperature: 22.4,
        outsideAirReh: 44.8,
        inclinedSolar: 861.1
      }
    }
  },
  isVisibleSpinner: false, // 로딩 화면 상태
  isSucceedMainDataReq: undefined
};

const mainDataReqReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAIN_DATA_REQUEST:
      return {
        ...state,
        isVisibleSpinner: true
      };
    case MAIN_DATA_SUCCESS:
      return {
        ...state,
        isVisibleSpinner: false,
        isSucceedMainDataReq: true,
        mainDataInfo: action.result.data
      };
    case MAIN_DATA_FAILURE:
      return {
        ...state,
        isVisibleSpinner: false,
        isSucceedMainDataReq: false
      };
    default:
      return state;
  }
};

export default mainDataReqReducer;
