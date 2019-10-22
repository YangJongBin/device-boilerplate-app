import React, { Component, useEffect } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import OverSpinner from "react-native-loading-spinner-overlay";

import { requestAuth } from "../../actions/upsas/authAction";

const AuthLoading = props => {
  const { isAuth, isVisibleSpinner } = props.authReducerInfo;

  useEffect(() => {
    props.requestAuthHandler();

    if (isAuth) {
      props.navigation.navigate("App");
    } else if (isAuth === false) {
      props.navigation.navigate("Auth");
    }
  }, [isAuth]);

  return <OverSpinner textContent="Loading..." textStyle={{ color: "white" }} visible={isVisibleSpinner} />;
};

const mapStateToProps = state => {
  return {
    authReducerInfo: state.authReducerInfo
  };
};

const mapDispathToProps = dispatch => {
  return {
    requestAuthHandler: () => {
      dispatch(requestAuth());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(AuthLoading);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    backgroundColor: "green",
    alignSelf: "center"
  }
});
