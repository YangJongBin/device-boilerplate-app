import {
  TREND_DATA_FAILURE,
  TREND_DATA_REQUEST,
  TREND_DATA_SUCCESS
} from '../actions/actionTypes';

const defaultState = {
  trendDataInfo: {
    headerInfo: {
      headerEnv: {
        currWeatherCastInfo: {
          inclinedSolar: 0,
          ws: 0,
          wf: 0,
          temp: 5
        }
      },
      headerMenu: {
        naviId: undefined,
        siteId: undefined,
        siteList: [
          {
            siteId: '',
            name: '',
            m_name: ''
          }
        ]
      }
    },
    containerInfo: {
      inverterTrendList: [],
      sensorTrendList: [
        {
          domId: undefined,
          title: undefined,
          subtitle: undefined,
          yAxis: [
            {
              yTitle: '',
              dataUnit: ''
            }
          ],
          plotSeries: {
            pointStart: undefined,
            pointInterval: undefined
          },
          series: [
            {
              name: '',
              color: '',
              tooltop: { valueSuffix: '' },
              data: [null, null]
            }
          ]
        }
      ]
    }
  },
  isVisibleSpinner: undefined,
  isSuccedTrendDateReq: undefined
};

const trendDataReqReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TREND_DATA_REQUEST:
      return {
        ...state,
        isVisibleSpinner: true
      };
    case TREND_DATA_SUCCESS:
      return {
        ...state,
        trendDataInfo: action.result.data,
        isVisibleSpinner: false,
        isSuccedTrendDateReq: true
      };
    case TREND_DATA_FAILURE:
      return {
        ...state,
        isVisibleSpinner: false,
        isSuccedTrendDateReq: false
      };
    default:
      return state;
  }
};

export default trendDataReqReducer;
