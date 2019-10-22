import React, { Component, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import { reqTrendData } from "../../actions/upsas/trendDataReqAction";

import LineChart from "../../components/LineChart";
import Header from "../../components/Header";

const TrendScreen = props => {
  useEffect(() => {
    props.trendDataReqHandler("");
  }, []);

  const sensorTrendList = [{}]; // FIXME: 삭제
  const lineCharts = _.map(sensorTrendList, sensorTrendInfo => {
    return <LineChart chartInfo={sensorTrendInfo}></LineChart>;
  });

  return <ScrollView>{lineCharts}</ScrollView>;
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    trendDataReqHandler: () => {
      dispatch(reqTrendData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendScreen);

const styles = StyleSheet.create({});
