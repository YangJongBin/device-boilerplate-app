import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native";
import { Container, Content, Footer, Thumbnail } from "native-base";

const { height } = Dimensions.get("window");

const ReportScreen = props => {
  const { userInfo } = props.authReducerInfo;
  const { userId, name } = userInfo;

  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.content}>
          <Thumbnail
            large
            source={require("../../../img/fp_logo.png")}
          ></Thumbnail>
          <Text style={styles.userIdText}>
            {userId} ({name})
          </Text>
        </View>
      </Content>
      <Footer style={styles.Footer}>
        <Text
          style={{ color: "#aaa" }}
          onPress={() => {
            Alert.alert(
              "",
              "로그아웃 하시겠습니까?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate("Login");
                  }
                }
              ],
              { cancelable: false }
            );
          }}
        >
          Sign Out
        </Text>
      </Footer>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducerInfo: state.authReducerInfo
  };
};

const mapDispatchToProps = () => {
  return {};
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: height,
    justifyContent: "center",
    alignItems: "center"
  },
  Footer: {
    justifyContent: "center",
    alignItems: "center"
  },
  userIdText: {
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
