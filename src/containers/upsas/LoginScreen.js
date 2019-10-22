import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import { Container, Content, Input, Form, Item, Icon, Button, Toast } from "native-base";
//actions...
import { requestLogin } from "../../actions/upsas/loginAction";

const LoginScreen = props => {
  const { isLoggedIn } = props.loginReducerInfo; // 로그인 reduce 정보

  // 로그인 성공 유무에 대한 이벤트
  useEffect(() => {
    // FIXME: 로그인 실패 메세지 수정
    if (isLoggedIn) {
      props.navigation.navigate("App");
    } else if (isLoggedIn === false) {
      Toast.show({
        type: "danger",
        text: "로그인 실패"
      });
    }
  }, [isLoggedIn]);

  // component
  return (
    <Container style={styles.container}>
      <Form style={styles.loginForm}>
        <Item>
          <Icon name="person" />
          <Input
            placeholder="UserId"
            onChangeText={text => {
              this.userid = text;
            }}
            style={styles.loginInput}
          />
        </Item>
        <Item last>
          <Icon name="lock" />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => {
              this.password = text;
            }}
            style={styles.loginInput}
          />
        </Item>
        <Button
          disabled={false}
          onPress={() => {
            props.loginHandler(this.userid, this.password);
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}> LOGIN </Text>
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    loginReducerInfo: state.loginReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginHandler: (id, pw) => {
      dispatch(requestLogin(id, pw));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

// style...
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginForm: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  loginInput: {
    margin: 10
  },
  loginBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#2f3640"
  },
  loginText: {
    color: "white"
  }
});
