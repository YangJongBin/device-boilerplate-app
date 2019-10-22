import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import _ from "lodash";
//components
import Gauge from "../../components/Gauge";
import PowerStatusGrid from "../../components/PowerStatusGrid";
import WeatherCastGrid from "../../components/WeatherCastGrid";

const { width, height } = Dimensions.get("window"); // 장치 화면 크기

const HomeScreen = props => {
  // 메인 데이터 요청
  useEffect(() => {}, []);

  return (
    <Container style={styles.container}>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text>기상정보</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <WeatherCastGrid currWeatherCastInfo={""} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>발전 그래프</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Gauge powerGenerationInfo={""} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>발전 현황</Text>
          </CardItem>
          <CardItem>
            <Body>
              <PowerStatusGrid powerGenerationInfo={""} />
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
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
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    // width: width,
    // height: height,
    backgroundColor: "red" //FIXME: 삭제
  }
});
