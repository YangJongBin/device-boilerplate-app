import React, { useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { LocaleConfig, Calendar } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import { Container, Content, Header, Left, Right, Card, CardItem, Body, List, ListItem } from "native-base";

Entypo.loadFont();

const DiaryScreen = props => {
  return (
    <Container>
      <Header>
        <Right>
          <Entypo name="plus"></Entypo>
        </Right>
      </Header>
      <Content>
        <List>
          <ListItem>
            <Body>
              <Text>header</Text>
              <Text>content</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connet(mapStateToProps, mapDispatchToProps)(DiaryScreen);
