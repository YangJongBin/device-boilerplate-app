import _ from "lodash";
import React, { useEffect } from "react";
import { StyleSheet, AsyncStorage, Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { Spinner, Container, Content, Thumbnail } from "native-base";
//actions
import { reqAuth, saveSiteId } from "../actions/authAction";

const { height: deviceHeight } = Dimensions.get("window");

const AuthScreen = props => {
  const { userInfo, naviPath } = props.authReducerInfo; // 인증 reducer 정보
  const defaultSiteId = _.head(userInfo.siteList).siteId;

  // 인증 요청
  useEffect(() => {
    props.handleAuthReq();
  }, []);

  // 인증 결과에 따라 페이지 이동
  useEffect(() => {
    props.navigation.navigate(naviPath);
    naviPath === "Login" && AsyncStorage.clear(); // 로그인 페이지로 이동시 asnycStorage 초기화
  }, [naviPath]);

  // 초기 장소 지정
  useEffect(() => {
    AsyncStorage.getItem("siteId", (err, siteId) => {
      props.handleSiteSave(_.isNull(siteId) ? defaultSiteId : siteId);
    });
  }, [defaultSiteId]);

  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.contentView}>
          <Thumbnail
            large
            square
            source={require("../../img/s2w_logo.png")}
          ></Thumbnail>
          <Spinner size={10}></Spinner>
        </View>
      </Content>
    </Container>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    height: deviceHeight,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(mapStateToProps, mapDispathToProps)(AuthScreen);
