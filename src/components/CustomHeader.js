import React, { Component, useState, useEffect } from "react";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Header, Body, Right, Left, Thumbnail } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import PickerSelect from "react-native-picker-select";
import _ from "lodash";

// icon load
MaterialIcon.loadFont();

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
        <Thumbnail small square source={require("../../img/fp_logo.png")}></Thumbnail>
      </Left>
      <Body>
        <PickerSelect
          value={selected}
          placeholder
          onValueChange={value => {
            setSelected(value);
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
    siteIdSaveReducerInfo: state.siteIdSaveReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
