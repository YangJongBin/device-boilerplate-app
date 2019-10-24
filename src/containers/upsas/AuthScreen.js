import React, { Component, useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import OverSpinner from "react-native-loading-spinner-overlay";
import _ from "lodash";
//actions
import { reqAuth } from "../../actions/upsas/authReqAction";
import { saveSiteId } from "../../actions/upsas/siteIdSaveAction";

const AuthScreen = props => {
  const { isAuth, isLoading, path } = props.authReducerInfo;

  AsyncStorage.getItem("siteId", (err, result) => {
    props.siteIdSaveHandler(result);
  });

  useEffect(() => {
    // 인증 요청
    !isAuth && props.authReqHandler();

    // 페이지 이동
    props.navigation.navigate(path);
  }, [isAuth]);

  return <OverSpinner textContent="Loading..." textStyle={{ color: "white" }} visible={isLoading} />;
};

const mapStateToProps = state => {
  return {
    authReducerInfo: state.authReducerInfo
  };
};

const mapDispathToProps = dispatch => {
  return {
    authReqHandler: () => {
      dispatch(reqAuth());
    },
    siteIdSaveHandler: siteId => {
      dispatch(saveSiteId(siteId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(AuthScreen);
