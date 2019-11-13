import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput } from "react-native";
import {
  Container,
  Content,
  Header,
  Right,
  Left,
  Body,
  Button
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";
//action
import { saveDiaryInfo } from "../actions/upsas/diaryAction";

EntypoIcon.loadFont();

// TODO:
const DiaryMemoView = props => {
  const { writedate, content } = props.selectedMemo;
  const [memoValue, setMemoValue] = useState(content);

  const DownButton = (
    <Button
      transparent
      onPress={() => {
        props.navigation.goBack();
      }}
    >
      <EntypoIcon name="chevron-down"></EntypoIcon>
    </Button>
  );

  const SaveButton = (
    <Button
      transparent
      onPress={() => {
        props.diaryMemoSaveHandler();
      }}
    >
      <Text>완료</Text>
    </Button>
  );

  return (
    <Container>
      <Header>
        <Body>
          <Text>{writedate}</Text>
        </Body>
        <Right>{memoValue == content ? DownButton : SaveButton}</Right>
      </Header>
      <Content padder>
        <TextInput
          multiline={true}
          value={memoValue}
          multiline={true}
          onChangeText={value => {
            setMemoValue(value);
          }}
        ></TextInput>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    diaryReducerInfo: state.diaryReducerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    diaryMemoSaveHandler: diaryInfo => {
      dispatch(saveDiaryInfo(diaryInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryMemoView);
