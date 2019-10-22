import React, { Component } from "react";

import Speedometer from "react-native-speedometer-chart";

const Gauge = props => {
  const { currKw = 0, currKwYaxisMax = 10 } = props.powerGenerationInfo;

  return (
    <Speedometer
      value={currKw}
      totalValue={currKwYaxisMax}
      size={250}
      outerColor="#d3d3d3"
      internalColor="#2ecc71"
      showText
      text={currKw}
      textStyle={{ color: "#2ecc71", fontWeight: "bold", fontSize: 40 }}
      showLabels
      labelStyle={{ color: "black" }}
      // showPercent
      percentStyle={{ color: "red" }}
      showIndicator={true}
      indicatorColor="gray"
    />
    // <Speedometer value={power} totalValue={maxPower} showIndicator size={250} />
  );
};

export default Gauge;
