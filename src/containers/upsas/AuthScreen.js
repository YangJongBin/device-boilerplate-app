import React, { Component, useEffect } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import OverSpinner from "react-native-loading-spinner-overlay";

import { reqAuth } from "../../actions/upsas/authReqAction";

const AuthScreen = props => {
  const { isAuth, isLoading, path } = props.authReducerInfo;

  useEffect(() => {
    // 인증 요청
    !isAuth && props.authReqHandler();

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(AuthScreen);
