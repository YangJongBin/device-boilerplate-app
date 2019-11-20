import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { Card, CardItem, Grid, Col, Row } from "native-base";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

FontistoIcon.loadFont();
IonIcon.loadFont();
MaterialCommunityIcon.loadFont();

const WeatherCastGrid = props => {
  const { temp = 0, ws = 0, inclinedSolar = 0, wf = 0 } = props.weatherCastInfo;

  let weahterName;
  let requireImg;

  switch (wf) {
    case 1: {
      weahterName = "맑음";
      requireImg = require("../../img/weather_1.png");
      break;
    }
    case 2: {
      weahterName = "구름 조금";
      requireImg = require("../../img/weather_2.png");
      break;
    }
    case 3: {
      weahterName = "구름 많음";
      requireImg = require("../../img/weather_3.png");
      break;
    }
    case 4: {
      weahterName = "흐림";
      requireImg = require("../../img/weather_4.png");
      break;
    }
    case 5: {
      weahterName = "비";
      requireImg = require("../../img/weather_5.png");
      break;
    }
    case 6: {
      weahterName = "눈/비";
      requireImg = require("../../img/weather_6.png");
      break;
    }
    case 7: {
      weahterName = "눈";
      requireImg = require("../../img/weather_7.png");
      break;
    }
  }

  return (
    <Grid>
      <Col style={styles.imgArea}>
        <Image style={styles.img} source={requireImg} />
      </Col>
      <Col style={styles.weatherArea}>
        <Text style={styles.weatherText}>{weahterName}</Text>
      </Col>
      <Col>
        <Row style={styles.iconArea}>
          <IonIcon
            style={styles.icon}
            name="md-sunny"
            size={25}
            color="#f9c04c"
          />
        </Row>
        <Row style={styles.iconArea}>
          <FontistoIcon
            style={styles.icon}
            name="wind"
            size={20}
            color="#87d5e7"
          />
        </Row>
        <Row style={styles.iconArea}>
          <MaterialCommunityIcon
            style={styles.icon}
            name="temperature-celsius"
            size={20}
            color="#ee5841"
          />
        </Row>
      </Col>
      <Col>
        <Row style={styles.dataArea}>
          <Text style={styles.inclinedSolarText}>{inclinedSolar}</Text>
        </Row>
        <Row style={styles.dataArea}>
          <Text style={styles.windText}>{ws}</Text>
        </Row>
        <Row style={styles.dataArea}>
          <Text style={styles.tempText}>{temp}</Text>
        </Row>
      </Col>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCastGrid);

const styles = StyleSheet.create({
  imgArea: {
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    margin: "10%",
    width: 40
  },
  weatherArea: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  weatherText: { fontSize: 20 },
  iconArea: {
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    margin: "5%"
  },
  dataArea: {
    justifyContent: "center",
    alignItems: "center"
  },
  inclinedSolarText: {
    fontWeight: "bold",
    color: "#f6b93b",
    marginTop: 3
  },
  tempText: {
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: 3
  },
  windText: {
    fontWeight: "bold",
    color: "#82ccdd",
    marginTop: 3
  }
});
