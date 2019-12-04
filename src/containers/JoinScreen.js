import React, { Component, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { Container, Content, Input, Item, Form, Button } from "native-base";
import {} from "react-native-webview";

const { width } = Dimensions.get("window");

export default class JoinScreen extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input placeholder="아이디"></Input>
            </Item>
            <Item>
              <Input placeholder="비밀번호" secureTextEntry></Input>
            </Item>
            <Item>
              <Input placeholder="비밀번호 재입력"></Input>
            </Item>
            <Item>
              <Input placeholder="이름"></Input>
            </Item>
            <Item>
              <Input placeholder="전화번호"></Input>
            </Item>
            <Button style={styles.signUpButton}>
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  }
});
