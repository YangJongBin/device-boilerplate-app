import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, AsyncStorage, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import _ from "lodash";

import { requestMainData } from "../actions/mainDataReqAction";

import Header from "../components/Header";
import Gauge from "../components/Gauge";
import PowerStatusGrid from "../components/PowerStatusGrid";
import WeatherCastGrid from "../components/WeatherCastGrid";

const { width, height } = Dimensions.get("window"); // 장치 화면 크기

const HomeScreen = props => {
  const { mainSeqChangeReducerInfo, mainDataReqReducerInfo, loginReducerInfo } = props;
  const { selectedMainSeq } = mainSeqChangeReducerInfo;
  const { headerInfo, containerInfo } = mainDataReqReducerInfo.mainDataInfo;
  const { headerEnv, headerMenu } = headerInfo; // 해더 정보
  const { powerGenerationInfo } = containerInfo; // 홈 메인 정보
  const { siteId, siteList } = headerMenu; // 장소 고유 야이디, 모든 장소 리스트
  const { currWeatherCastInfo } = headerEnv; // 기상 환경 정보

  useEffect(() => {
    _.isUndefined(selectedMainSeq) ? props.reqMainDataHandler("") : props.reqMainDataHandler(selectedMainSeq);
  }, [selectedMainSeq]);

  return (
    <Container style={styles.container}>
      <Header siteList={siteList} navigation={props.navigation} />
      <Content padder style={{ flex: 1 }}>
        <Card>
          <CardItem header bordered>
            <Text>기상정보</Text>
          </CardItem>
          <CardItem bordered>
            <Body style={styles.cardBody}>
              <WeatherCastGrid currWeatherCastInfo={currWeatherCastInfo} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>발전 그래프</Text>
          </CardItem>
          <CardItem>
            <Body style={styles.cardBody}>
              <Gauge powerGenerationInfo={powerGenerationInfo} />
            </Body>
          </CardItem>
        </Card>
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text>발전 현황</Text>
          </CardItem>
          <CardItem>
            <Body style={styles.cardBody}>
              <PowerStatusGrid powerGenerationInfo={powerGenerationInfo} />
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo != undefined) {
    }
  } catch (error) {
    alert("Can`t find userInfo...");
  }
};

const mapStateToProps = state => {
  return {
    loginReducerInfo: state.loginReducerInfo,
    mainDataReqReducerInfo: state.mainDataReqReducerInfo, // 메인데이터 정보
    mainSeqChangeReducerInfo: state.mainSeqChangeReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reqMainDataHandler: mainSeq => {
      dispatch(requestMainData(mainSeq));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    height: height
  },
  cardBody: {
    justifyContent: "center",
    alignItems: "center",
    margin: "2%"
  }
});
