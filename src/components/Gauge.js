import React, { Component } from "react";
import Speedometer from "react-native-speedometer-chart";

const Gauge = props => {
  const { currkW = 0, currkWMax = 0 } = props.powerGenerationInfo;
  return (
    <Speedometer
      value={currkW}
      totalValue={currkWMax}
      size={250}
      outerColor="#d3d3d3"
      internalColor="#2ecc71"
      showText
      text={currkW}
      textStyle={{ color: "#2ecc71", fontWeight: "bold", fontSize: 40 }}
      showLabels
      labelStyle={{ color: "black" }}
      // showPercent
      percentStyle={{ color: "red" }}
      showIndicator={true}
      indicatorColor="gray"
    />
  );
};

export default Gauge;
