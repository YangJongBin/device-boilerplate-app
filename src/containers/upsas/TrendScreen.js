import React, { Component, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card, Container, Content } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";
//compoents
import CustomHeader from "../../components/CustomHeader";
import LineChart from "../../components/LineChart";
//action
import { reqTrendData } from "../../actions/upsas/trendAction";

// 라인 차트 리스트 생성
const makeLineChartList = lineChartDataList => {
  return _.map(lineChartDataList, lineChartDataInfo => {
    return (
      <Card>
        <LineChart chartInfo={lineChartDataInfo}></LineChart>
      </Card>
    );
  });
};

const TrendScreen = props => {
  const { trendReducerInfo, authReducerInfo } = props;
  // trend 응답 데이터 정보
  const { trendDataInfo, isLoading } = trendReducerInfo;
  const { sensorTrendList } = trendDataInfo;
  // auth 응답 데이터 정보
  const { userInfo } = authReducerInfo;
  const { siteList } = userInfo;

  const { siteId } = props.siteIdSaveReducerInfo; // 선택된 장소 id

  // 트렌드 데이터 요청
  useEffect(() => {
    props.trendDataReqHandler(siteId);
  }, [siteId]);

  return (
    <Container>
      <CustomHeader siteId={siteId} siteList={siteList}></CustomHeader>
      <Content>
        <ScrollView>{makeLineChartList(sensorTrendList)}</ScrollView>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    trendReducerInfo: state.trendReducerInfo,
    authReducerInfo: state.authReducerInfo,
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
