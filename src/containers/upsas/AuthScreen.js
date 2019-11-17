import _ from "lodash";
import React, { useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Spinner, Container, Content } from "native-base";
//component
import OverSpinner from "react-native-loading-spinner-overlay";
//actions
import { reqAuth, saveSiteId } from "../../actions/upsas/authAction";

const AuthScreen = props => {
  const { isLoading, path, userInfo } = props.authReducerInfo; // 인증 reducer 정보
  const defaultSiteId = _.head(userInfo.siteList).siteId;

  // 인증 요청
  useEffect(() => {
    props.handleAuthReq();
  }, []);

  // 인증 결과에 따라 페이지 이동
  useEffect(() => {
    props.navigation.navigate(path);
    path === "Login" && AsyncStorage.clear(); // 로그인 페이지로 이동시 asnycStorage 초기화
  }, [path]);

  // 초기 장소 지정
  useEffect(() => {
    AsyncStorage.getItem("siteId", (err, siteId) => {
      _.isNull(siteId)
        ? props.handleSiteSave(defaultSiteId)
        : props.handleSiteSave(siteId);
    });
  }, [defaultSiteId]);

  return (
    <Container>
      <Content>
        <Spinner></Spinner>
      </Content>
    </Container>
  );
  // return <OverSpinner textContent="Loading..." textStyle={{ color: "white" }} visible={isLoading} />;
};

const mapStateToProps = state => {
  return {
    authReducerInfo: state.authReducerInfo
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleAuthReq: () => {
      dispatch(reqAuth());
    },
    handleSiteSave: siteId => {
      dispatch(saveSiteId(siteId));
    }
  };
};

export default connect(mapStateToProps, mapDispathToProps)(AuthScreen);
