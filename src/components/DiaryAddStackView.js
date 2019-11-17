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
import moment from "moment";
import EntypoIcon from "react-native-vector-icons/Entypo";

//action
import { saveDiaryInfo } from "../actions/upsas/diaryAction";

EntypoIcon.loadFont();

// TODO:
const DiaryMemoView = props => {
  const [stateContent, setStateContent] = useState("");

  const setDownButton = () => (
    <Button
      transparent
      onPress={() => {
        props.navigation.goBack();
      }}
    >
      <EntypoIcon name="chevron-down"></EntypoIcon>
    </Button>
  );

  const setSaveButton = (writedate, content) => (
    <Button
      transparent
      onPress={() => {
        props.diarySaveHandler({ writedate, content });
        props.navigation.goBack();
      }}
    >
      <Text>완료</Text>
    </Button>
  );

  return (
    <Container>
      <Header>
        <Body>
          <Text>{moment().format("YYYY-MM-DD")}</Text>
        </Body>
        <Right>
          {stateContent == ""
            ? setDownButton()
            : setSaveButton(moment().format("YYYY-MM-DD"), stateContent)}
        </Right>
      </Header>
      <Content padder>
        <TextInput
          multiline={true}
          placeholder="여기에 내용을 적어주세요."
          multiline={true}
          onChangeText={value => {
            setStateContent(value);
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
    diarySaveHandler: diaryInfo => {
      dispatch(saveDiaryInfo(diaryInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryMemoView);
