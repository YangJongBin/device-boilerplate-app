import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { Container, Input, Form, Item, Icon, Button, Toast } from "native-base";
//actions...
import { reqLogin } from "../actions/authAction";

const LoginScreen = props => {
  const { isLoading, isLoggedIn, naviPath } = props.authReducerInfo; // 로그인 reduce 정보
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();

  const checkLoginInfo = (userId, password) => {
    if (!userId && password) {
      Toast.show({
        text: "아이디를 입력해주세요.",
        type: "danger"
      });
    } else if (userId && !password) {
      Toast.show({
        text: "비밀번호를 입력해주세요.",
        type: "danger"
      });
    } else if (!userId && !password) {
      Toast.show({
        text: "아이디와 비밀번호를 확인해주세요.",
        type: "danger"
      });
    } else if (userId && password) {
      props.loginHandler(userId, password);
    }
  };

  useEffect(() => {
    props.navigation.navigate(naviPath);
  }, [isLoggedIn]);

  return (
    <Container style={styles.container}>
      <Form style={styles.loginForm}>
        <Item>
          <Icon name="person" />
          <Input
            placeholder="UserId"
            onChangeText={userIdInputValue => {
              setUserId(userIdInputValue);
            }}
            style={styles.loginInput}
          />
        </Item>
        <Item last>
          <Icon name="lock" />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={passwordInputValue => {
              setPassword(passwordInputValue);
            }}
            style={styles.loginInput}
          />
        </Item>
        <Button
          disabled={false}
          onPress={() => {
            checkLoginInfo(userId, password);
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}> {isLoading ? "" : "Sign In"} </Text>
          <ActivityIndicator animating={isLoading}></ActivityIndicator>
        </Button>
      </Form>
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
    loginHandler: (id, pw) => {
      dispatch(reqLogin(id, pw));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
  },
  signUpText: {
    color: "#aaa",
    marginTop: 10
  }
});
