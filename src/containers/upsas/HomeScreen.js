import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import _ from "lodash";
//component
import Gauge from "../../components/Gauge";
import PowerStatusGrid from "../../components/PowerStatusGrid";
import WeatherCastGrid from "../../components/WeatherCastGrid";
import CustomHeader from "../../components/CustomHeader";
import GrowthChart from "../../components/GrowthChart";
//action
import { reqHomeData } from "../../actions/upsas/homeAction";

const HomeScreen = props => {
  const { homeReducerInfo, authReducerInfo, siteIdSaveReducerInfo } = props;
  // home 응답 데이터
  const { homeDataInfo } = homeReducerInfo; // reducer 정보
  const {
    weatherCastInfo,
    powerGenerationInfo,
    growthEnvChartInfo
  } = homeDataInfo;
  // auth 응답 데이터
  const { userInfo } = authReducerInfo;
  const { siteList } = userInfo;
  const { siteId } = siteIdSaveReducerInfo; // 선택된 장소 id

  // 메인 데이터 요청
  useEffect(() => {
    siteId && props.homeDataReqHandler(siteId);
  }, [siteId]);

  return (
    <Container style={styles.container}>
      <CustomHeader siteId={siteId} siteList={siteList}></CustomHeader>
      <Content style={styles.content}>
        <Card>
          <CardItem header bordered>
            <Text>기상정보</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <WeatherCastGrid weatherCastInfo={weatherCastInfo} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>발전 그래프</Text>
          </CardItem>
          <CardItem>
            <Body style={{ justifyContent: "center", alignItems: "center" }}>
              <Gauge powerGenerationInfo={powerGenerationInfo} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>발전 현황</Text>
          </CardItem>
          <CardItem>
            <Body>
              <PowerStatusGrid powerGenerationInfo={powerGenerationInfo} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>생육 환경 현황</Text>
          </CardItem>
          <CardItem>
            <GrowthChart growthEnvChartInfo={growthEnvChartInfo}></GrowthChart>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    homeReducerInfo: state.homeReducerInfo,
    authReducerInfo: state.authReducerInfo,
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeDataReqHandler: siteId => {
      dispatch(reqHomeData(siteId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {}
});
