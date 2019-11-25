import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Input,
  Form,
  Item,
  Icon,
  Button,
  Toast
} from "native-base";
//actions...
import { reqLogin } from "../../actions/upsas/authAction";

const LoginScreen = props => {
  const { isLoggedIn, path } = props.loginReducerInfo; // 로그인 reduce 정보
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

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
            if (!userId && !password)
              props.loginHandler(this.userid, this.password);
            props.navigation.navigate(path);
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}> Sign In </Text>
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
