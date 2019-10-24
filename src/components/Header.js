import React, { Component, useState } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Header, Body, Right, ActionSheet, Title, Left } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import PickerSelect from "react-native-picker-select";
//actions
import { saveSiteId } from "../actions/upsas/siteIdSaveAction";

MaterialIcon.loadFont();

const CustomHeader = props => {
  const { userInfo } = props.authReducerInfo;
  const [selected, setSelected] = useState(0);
  const items = _.map(userInfo.siteList, siteInfo => {
    return {
      label: siteInfo.siteName,
      value: siteInfo.siteId
    };
  });

  AsyncStorage.getItem("siteId", (err, result) => {
    setSelected(result);
  });

  return (
    <Header style={styles.header}>
      <Left></Left>
      <Body>
        <PickerSelect
          value={selected}
          placeholder
          onValueChange={value => {
            setSelected(value);
            props.siteIdSaveHandler(value);
            AsyncStorage.setItem("siteId", value);
          }}
          items={items}
        ></PickerSelect>
      </Body>
      <Right></Right>
    </Header>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo,
    authReducerInfo: state.authReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    siteIdSaveHandler: siteId => {
      dispatch(saveSiteId(siteId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
