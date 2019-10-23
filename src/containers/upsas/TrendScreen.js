import React, { Component, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

import { reqTrendData } from "../../actions/upsas/trendDataReqAction";

import LineChart from "../../components/LineChart";

const TrendScreen = props => {
  const { trendDataInfo, isSuccess, isLoading } = props.trendDataReqReducerInfo;
  const { inverterTrendList, sensorTrendList } = trendDataInfo;

  useEffect(() => {
    !isSuccess && props.trendDataReqHandler();
  }, [isSuccess]);

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
  return {
    trendDataReqReducerInfo: state.trendDataReqReducerInfo
  };
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
