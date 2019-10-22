import React, { Component, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

import test from "../../../testData";

import LineChart from "../../components/LineChart";

const TrendScreen = props => {
  useEffect(() => {}, []);

  const sensorTrendList = test;
  const lineCharts = _.map(sensorTrendList, sensorTrendInfo => {
    return (
      <Card>
        <LineChart chartInfo={sensorTrendInfo}></LineChart>
      </Card>
    );
  });

  return <ScrollView>{lineCharts}</ScrollView>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendScreen);
