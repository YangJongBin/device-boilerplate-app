import { TREND_DATA_FAILURE, TREND_DATA_REQUEST, TREND_DATA_SUCCESS } from "../../actions/actionTypes";

const defaultState = {
  trendDataInfo: {
    inverterTrendList: [],
    sensorTrendList: [
      {
        domId: "",
        title: "",
        subtitle: "",
        yAxis: [
          {
            yTitle: "",
            dataUnit: ""
          }
        ],
        plotSeries: {
          pointStart: 0,
          pointInterval: 0
        },
        series: [
          {
            name: "",
            color: "",
            tooltop: { valueSuffix: "" },
            data: [null, null]
          }
        ]
      }
    ]
  },
  isLoading: true,
  isSuccess: false
};

const trendDataReqReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TREND_DATA_REQUEST:
      return {
        ...state
      };
    case TREND_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        trendDataInfo: action.result.data
      };
    case TREND_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    default:
      return state;
  }
};

export default trendDataReqReducer;
