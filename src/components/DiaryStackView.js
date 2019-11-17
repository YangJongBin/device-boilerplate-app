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
  Button,
  Footer
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";
//action
import { saveDiaryInfo, deleteDiaryInfo } from "../actions/upsas/diaryAction";

EntypoIcon.loadFont();

// TODO:
const DiaryMemoView = props => {
  const { seq, writedate, content } = props.selectedDiaryInfo;
  const [stateContent, setStateContent] = useState(content);

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

  const setSaveButton = (seq, writedate, content) => (
    <Button
      transparent
      onPress={() => {
        props.diarySaveHandler({ seq, writedate, content });
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
          <Text>{writedate}</Text>
        </Body>
        <Right>
          {stateContent == content
            ? setDownButton()
            : setSaveButton(seq, writedate, stateContent)}
        </Right>
      </Header>
      <Content padder>
        <TextInput
          multiline={true}
          value={stateContent}
          multiline={true}
          onChangeText={value => {
            setStateContent(value);
          }}
        ></TextInput>
      </Content>
      <Footer style={{ backgroundColor: "transparent" }}>
        <Right>
          <Button
            transparent
            onPress={() => {
              props.diaryDeleteHandler({ seq, writedate, connect });
              props.navigation.goBack();
            }}
          >
            <EntypoIcon name="trash"></EntypoIcon>
          </Button>
        </Right>
      </Footer>
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
    },
    diaryDeleteHandler: diaryInfo => {
      dispatch(deleteDiaryInfo(diaryInfo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryMemoView);
