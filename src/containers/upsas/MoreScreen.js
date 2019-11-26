import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native";
import {
  Container,
  Content,
  Footer,
  ListItem,
  List,
  Header,
  Col
} from "native-base";
//action
import { reqLogout } from "../../actions/upsas/authAction";
import OveralyLoading from "react-native-loading-spinner-overlay";

const { height } = Dimensions.get("window");

const ReportScreen = props => {
  const { userInfo, isLoggedIn, isLoading, naviPath } = props.authReducerInfo;
  const { userId, name } = userInfo;

  useEffect(() => {
    props.navigation.navigate(naviPath);
  }, [isLoggedIn]);

  return (
    <Container style={styles.container}>
      <OveralyLoading visible={isLoading}></OveralyLoading>
      <Header></Header>
      <Content>
        <List>
          <ListItem>
            <Col style={styles.alignItemsFlexEnd}>
              <Text style={styles.idText}>{userId}</Text>
              <Text>{name}</Text>
            </Col>
          </ListItem>
          <ListItem>
            <Text>version 0.0.1</Text>
          </ListItem>
        </List>
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
                    props.handleLogout();
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

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => {
      dispatch(reqLogout());
    }
  };
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
  },
  alignItemsFlexEnd: {
    alignItems: "flex-end"
  },
  idText: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
    fontWeight: "bold"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
