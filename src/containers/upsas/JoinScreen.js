import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { Container, Content, Input, Item, Form, Icon, Picker } from "native-base";
import {} from "react-native-webview";

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
              <Input placeholder="비밀번호"></Input>
            </Item>
            <Item>
              <Input placeholder="비밀번호 재입력"></Input>
            </Item>
            <Item>
              <Input placeholder="이름"></Input>
            </Item>
            <Item>
              {/* <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                // selectedValue={this.state.selected2}
                onValueChange
              ></Picker> */}
              <Input placeholder="전화번호"></Input>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "8%" }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                // selectedValue={this.state.selected2}
                onValueChange
              ></Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
