import React, { Component } from "react";
import ChartView from "react-native-highcharts";

const LinChart = props => {
  const { chartInfo } = props;
  const chartOptions = {
    lang: {
      months: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      shortMonths: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      weekdays: ["월", "화", "수", "목", "금", "토", "일"]
    }
  };

  const conf = {
    chart: {
      type: "line",
      zoomType: "xy"
      // backgroundColor: '#212121'
    },
    title: {
      text: chartInfo.title
    },
    subtitle: {
      text: chartInfo.subtitle
    },
    xAxis: {
      title: {
        text: ""
      },
      type: "datetime",
      tickWidth: 0,
      // gridLineWidth: 1,
      dateTimeLabelFormats: {
        second: "%H:%M:%S",
        minute: "%H:%M",
        hour: "%H:%M",
        day: "%m-%e",
        week: "%m-%e",
        month: "%y-%m",
        year: "%Y"
      }
    },
    // yAxis:[{ yTitle: "일사랑", dataUnit: "W/m²" }],
    yAxis: {
      title: {
        text: chartInfo.yAxis[0].yTitle
      },
      labels: {
        format: `{value:.,0f} ${chartInfo.yAxis[0].dataUnit}`
      }
    },

    legend: {
      align: "left",
      verticalAlign: "bottom",
      borderWidth: 0
    },

    tooltip: {
      valueDecimals: 2,
      shared: true,
      crosshairs: true
    },

    plotOptions: {
      series: chartInfo.plotSeries,
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1
        }
      }
    },

    series: chartInfo.series,
    credits: {
      enabled: false
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
        height: 300,
        width: "100%"
      }}
      config={conf}
      options={chartOptions}
    />
  );
};

export default LinChart;
