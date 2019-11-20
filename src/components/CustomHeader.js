import React, { Component, useState, useEffect } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Header, Body, Right, Left, Thumbnail } from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";
import PickerSelect from "react-native-picker-select";
import _ from "lodash";
// action
import { saveSiteId } from "../actions/upsas/headerAction.js";

// icon load
EntypoIcon.loadFont();

const CustomHeader = props => {
  const { siteId, siteList } = props;
  const [selected, setSelected] = useState(0); // state로 관리하지 않으면 pick이 되지않음.
  //
  const items = _.map(siteList, siteInfo => {
    return {
      label: siteInfo.siteName,
      value: siteInfo.siteId
    };
  });

  useEffect(() => {
    setSelected(siteId);
  }, [siteId]);

  return (
    <Header style={styles.header}>
      <Left>
        <Thumbnail
          small
          square
          source={require("../../img/fp_logo.png")}
          style={styles.thumbnail}
        ></Thumbnail>
      </Left>
      <Body style={styles.body}>
        <PickerSelect
          placeholder={{}}
          value={selected}
          style={pickerStyle}
          onValueChange={value => {
            setSelected(value);
            props.handleSiteIdSave(value);
            AsyncStorage.setItem("siteId", value);
          }}
          // Icon={() => <EntypoIcon name="chevron-down"></EntypoIcon>}
          items={items}
        ></PickerSelect>
      </Body>
      <Right></Right>
    </Header>
  );
};

const pickerStyle = {
  inputIOS: {
    alignSelf: "center",
    paddingLeft: 10
  },
  inputAndroid: {
    alignSelf: "center",
    paddingLeft: 10
  },
  iconContainer: {}
};

const styles = StyleSheet.create({
  header: {},
  body: {
    flex: 5
  }
});

const mapStateToProps = state => {
  return {
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSiteIdSave: siteId => {
      dispatch(saveSiteId(siteId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
