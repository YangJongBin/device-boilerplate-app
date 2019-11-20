import React, { Component } from "react";
import ChartView from "react-native-highcharts";

const GrowthChart = props => {
  const { growthEnvChartInfo } = props;
  const fontColor = "black";
  const conf = {
    chart: {
      type: "column",
      spacing: 25,
      spacingTop: 30,
      backgroundColor: "white"
    },
    title: {
      text: "",
      style: {
        color: fontColor
      }
    },
    // subtitle: {
    //   text: "생육 환경 현황",
    //   style: {
    //     color: fontColor
    //   }
    // },
    xAxis: {
      categories: ["토양", "외기"],
      crosshair: true,
      labels: {
        style: {
          color: fontColor
        }
      }
    },
    yAxis: [
      {
        labels: {
          format: "{value} °C",
          style: {
            color: fontColor
          }
        },
        title: {
          text: "온도",
          style: {
            color: fontColor
          }
        },
        min: -10,
        max: 40,
        tickInterval: 10
      },
      {
        labels: {
          format: "{value} %",
          style: {
            color: fontColor
          }
        },
        title: {
          text: "습도",
          style: {
            color: fontColor
          }
        },
        min: 0,
        max: 100,
        tickInterval: 20,
        opposite: 1
      }
    ],
    tooltip: {
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        threshold: -20
      }
    },
    series: [
      {
        name: "온도",
        data: [
          growthEnvChartInfo.soilTemperature,
          growthEnvChartInfo.outsideAirTemperature
        ],
        color: "red",
        tooltip: {
          valueSuffix: " °C"
        }
      },
      {
        name: "습도",
        data: [growthEnvChartInfo.soilReh, growthEnvChartInfo.outsideAirReh],
        yAxis: 1,
        tooltip: {
          valueSuffix: " %"
        }
      },
      {
        name: "수분",
        data: [growthEnvChartInfo.soilWaterValue],
        yAxis: 1,
        tooltip: {
          valueSuffix: " %"
        }
      }
    ],
    credits: {
      enabled: false
    },
    legend: {
      itemStyle: {
        color: fontColor,
        fontWeight: "bold"
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    }
  };
  return (
    <ChartView
      style={{
        flex: 1,
        height: 300,
        width: "100%"
      }}
      config={conf}
      options
    />
  );
};

export default GrowthChart;
