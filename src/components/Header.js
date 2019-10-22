import React, { Component } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Header, Body, Container, Right, ActionSheet, Title, Left } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";

import { requestChangeMainSeq } from "../actions/upsas/mainSeqChangeAction";

MaterialIcon.loadFont();

const customHeader = props => {
  const { selectedPlaceName = "", siteList = [] } = props;
  const placeNameList = _.map(siteList, "name");

  const changeMainSeq = (siteList, placeName) => {
    const foundSiteInfo = _.find(siteList, { name: placeName });
    props.mainSeqChangeReqHandler(foundSiteInfo.siteId);
  };

  return (
    <Header style={styles.header}>
      <Left>
        {/* <Icon
          name="logout"
          size={30}
          coloe="black"
          onPress={() => {
            AsyncStorage.clear();
            props.navigation.navigate("Auth");
          }}
        /> */}
      </Left>
      <Body>
        {/* <Text style={styles.placeNameText}>{selectedPlaceName}</Text> */}
        <Title style={styles.placeNameText}>수중 태양광</Title>
      </Body>
      <Right>
        <MaterialIcon
          name="place"
          size={30}
          color="black"
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
        />
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  // header: {
  //   backgroundColor: "#2f3640"
  // },
  // headerText: {
  //   fontWeight: "bold",
  //   color: "white",
  //   fontSize: 20
  // }
});

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
)(customHeader);
