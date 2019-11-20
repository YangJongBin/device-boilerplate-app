import React, { Component } from "react";
import Speedometer from "react-native-speedometer-chart";

const Gauge = props => {
  const { currkW = 0, currkWMax = 0 } = props.powerGenerationInfo;

  return (
    <Speedometer
      value={currkW} // gauge 값
      totalValue={currkWMax} // value max 값
      size={250} // gauge 전체 크기
      outerColor="#d3d3d3" // gauge 내부 outer 색
      internalColor="#2ecc71" // gauge 내부 interal 색
      showText // value의 텍스트 값 유무
      text={`${currkW}`} // value의 텍스트 값 표시 유무
      textStyle={{
        color: "#2ecc71",
        fontWeight: "bold",
        fontSize: 40
      }}
      showLabels={true} // gauge 최소 최대 값 텍스트 표시 유무
      labelStyle={{ color: "black" }}
      // showPercent
      percentStyle={{ color: "red" }}
      // showIndicator={true}
      // indicatorColor="gray"
    />
  );
};

export default Gauge;
