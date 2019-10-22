import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import { ActionSheet, Button, Grid, Row, Col, Container, Content } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

const PlaceSelector = props => {
  const changeMainSeq = (siteList, placeName) => {
    const foundSiteInfo = _.find(siteList, { name: placeName });
    props.mainSeqChangeReqHandler(foundSiteInfo.siteId);
  };

  const { selectedPlaceName = "", siteList = [] } = props;
  const placeNameList = _.map(siteList, "name");

  return (
    <Container style={styles.container}>
      <Content style={{ flexDirection: "row" }}>
        <Icon name="place" size={20} color="#e74c3c" />
        <Text style={styles.placeNameText}>{selectedPlaceName}</Text>
      </Content>
      <Button
        style={styles.placeChangeBtn}
        onPress={() =>
          ActionSheet.show(
            {
              options: placeNameList
            },
            buttonIndex => {
              if (!_.isUndefined(buttonIndex)) {
                changeMainSeq(siteList, placeNameList[buttonIndex]);
              }
            }
          )
        }
      >
        <Text style={styles.placeChangeBtnText}>변경</Text>
      </Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    mainSeqChangeReqHandler: selectedMainSeq => {
      dispatch(requestChangeMainSeq(selectedMainSeq));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceSelector);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    justifyContent: "space-between",
    alignItems: "center"
    // borderTopColor: '#393e46',
    // borderTopWidth: 1
  },
  placeNameText: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5
  },
  placeChangeBtn: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 20
  },
  placeChangeBtnText: {
    fontWeight: "bold"
  }
});
