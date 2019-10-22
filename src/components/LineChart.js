import React, { Component } from "react";
import _ from "lodash";
import ChartView from "react-native-highcharts";

const LinChart = props => {
  const Highcharts = "Highcharts";
  const { chartInfo = {} } = props;

  const conf = {
    chart: {
      type: "spline",
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10
    },
    chartInfo
  };

  const options = {
    global: {
      useUTC: false
    },
    lang: {
      decimalPoint: ",",
      thousandsSep: "."
    }
  };

  return <ChartView style={{ height: 300 }} config={conf} options={options}></ChartView>;
};

export default LinChart;
