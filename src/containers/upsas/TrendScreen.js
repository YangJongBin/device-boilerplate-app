import React, { Component, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card, Container, Content } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";
//compoents
import Header from "../../components/Header";

import { reqTrendData } from "../../actions/upsas/trendDataReqAction";

import LineChart from "../../components/LineChart";

const TrendScreen = props => {
  const { trendDataInfo, isLoading } = props.trendDataReqReducerInfo;
  const { siteId } = props.siteIdSaveReducerInfo;
  const { sensorTrendList } = trendDataInfo;

  useEffect(() => {
    props.trendDataReqHandler(siteId);
  }, [siteId]);

  const lineCharts = _.map(sensorTrendList, sensorTrendInfo => {
    return (
      <Card>
        <LineChart chartInfo={sensorTrendInfo}></LineChart>
      </Card>
    );
  });

  return (
    <Container>
      <Header></Header>
      <Content>
        <ScrollView style={{ backgroundColor: "red" }}>{lineCharts}</ScrollView>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    trendDataReqReducerInfo: state.trendDataReqReducerInfo,
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    trendDataReqHandler: siteId => {
      dispatch(reqTrendData(siteId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendScreen);
