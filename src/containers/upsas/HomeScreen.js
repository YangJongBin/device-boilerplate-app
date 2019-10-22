import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, AsyncStorage, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Body } from "native-base";
import _ from "lodash";

import { requestMainData } from "../../actions/upsas/mainDataReqAction";

import Gauge from "../../components/Gauge";
import PowerStatusGrid from "../../components/PowerStatusGrid";
import WeatherCastGrid from "../../components/WeatherCastGrid";

const { width, height } = Dimensions.get("window"); // 장치 화면 크기

const HomeScreen = props => {
  useEffect(() => {}, []);

  return (
    <Container style={styles.container}>
      <Content padder style={{ flex: 1 }}>
        <Card>
          <CardItem header bordered>
            <Text>기상정보</Text>
          </CardItem>
          <CardItem bordered>
            <Body style={styles.cardBody}>
              <WeatherCastGrid currWeatherCastInfo={""} />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>발전 그래프</Text>
          </CardItem>
          <CardItem>
            <Body style={styles.cardBody}>
              <Gauge powerGenerationInfo={""} />
            </Body>
          </CardItem>
        </Card>
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text>발전 현황</Text>
          </CardItem>
          <CardItem>
            <Body style={styles.cardBody}>
              <PowerStatusGrid powerGenerationInfo={""} />
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
    height: height
  },
  cardBody: {
    justifyContent: "center",
    alignItems: "center",
    margin: "2%"
  }
});
