import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
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

const DiaryStackView = props => {
  const { seq, writedate, content } = props.selectedDiaryInfo;
  const [stateContent, setStateContent] = useState(content);

  // 닫기 버튼
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

  // 저장 버튼
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
        <Body style={styles.headerBody}>
          <Text style={styles.headerText}>{writedate}</Text>
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
      <Footer style={styles.footer}>
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

const styles = StyleSheet.create({
  headerBody: {
    alignItems: "flex-start"
  },
  headerText: {
    fontWeight: "bold",
    paddingHorizontal: 5
  },
  footer: {
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderTopWidth: 0
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryStackView);
