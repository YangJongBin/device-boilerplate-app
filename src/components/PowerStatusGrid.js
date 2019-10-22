import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Grid, Col, Row, Card, CardItem } from "native-base";

const PowerStatusGrid = props => {
  const { currkW = 0, dailyPower = 0, monthPower = 0, comulativePower = 0 } = props.powerGenerationInfo;

  return (
    <Grid>
      {/* titleArea */}
      <Col style={{ flex: 0.7 }}>
        <Row style={styles.titleArea}>
          <Text>현재출력</Text>
        </Row>
        <Row style={styles.titleArea}>
          <Text>금일발전량</Text>
        </Row>
        <Row style={styles.titleArea}>
          <Text>당월발전량</Text>
        </Row>
        <Row style={styles.titleArea}>
          <Text>누적발전량</Text>
        </Row>
      </Col>
      {/* dataArea */}
      <Col style={{ flex: 1 }}>
        <Row style={styles.dataArea}>
          <Text style={styles.dataText}>{currkW}</Text>
        </Row>
        <Row style={styles.dataArea}>
          <Text style={styles.dataText}>{dailyPower}</Text>
        </Row>
        <Row style={styles.dataArea}>
          <Text style={styles.dataText}>{monthPower}</Text>
        </Row>
        <Row style={styles.dataArea}>
          <Text style={styles.dataText}>{comulativePower}</Text>
        </Row>
      </Col>
      {/* dataUnitArea */}
      <Col style={{ flex: 0.5 }}>
        <Row style={styles.unitArea}>
          <Text>kW</Text>
        </Row>
        <Row style={styles.unitArea}>
          <Text>kWh</Text>
        </Row>
        <Row style={styles.unitArea}>
          <Text>kWh</Text>
        </Row>
        <Row style={styles.unitArea}>
          <Text>MWh</Text>
        </Row>
      </Col>
    </Grid>
  );
};

const styles = StyleSheet.create({
  titleArea: {
    justifyContent: "flex-start",
    paddingTop: "10%"
  },
  dataArea: {
    justifyContent: "flex-end",
    paddingTop: "5%"
  },
  unitArea: {
    justifyContent: "center",
    paddingTop: "10%"
  },
  dataText: {
    fontWeight: "bold",
    color: "#2ecc71",
    marginBottom: 5
  }
});

export default PowerStatusGrid;
