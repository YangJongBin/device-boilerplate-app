import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { LocaleConfig, Calendar } from "react-native-calendars";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Card,
  CardItem,
  Body,
  List,
  ListItem,
  Button,
  Thumbnail,
  Drawer
} from "native-base";
import _ from "lodash";
//action
import { reqDiaryData, saveDiaryList } from "../../actions/upsas/diaryAction";

//icon load
EntypoIcon.loadFont();

const DiaryScreen = props => {
  const { diaryDataList } = props.diaryReducerInfo; // 일지 리스트

  const [stateDiaryList, setStateDiaryList] = useState({});

  // 일지 리스트 생성
  const makeDiaryList = diaryDataList => {
    return _.map(diaryDataList, diaryDataInfo => {
      return (
        <ListItem
          onPress={() => {
            props.navigation.navigate("DiaryMemoView", {
              writedate: diaryDataInfo.writedate,
              content: diaryDataInfo.content
            });
          }}
        >
          <Body>
            <Text>{diaryDataInfo.writedate}</Text>
            <Text>{diaryDataInfo.content}</Text>
          </Body>
        </ListItem>
      );
    });
  };

  //일지 정보 요청
  useEffect(() => {
    props.diaryDataReqHandler();
    // setStateDiaryList(diaryDataList);
  }, []);

  useEffect(() => {
    setStateDiaryList(diaryDataList);
  }, [diaryDataList]);

  return (
    <Container>
      <Header>
        <Left>
          <Thumbnail
            square
            small
            source={require("../../../img/fp_logo.png")}
          ></Thumbnail>
        </Left>
        <Right>
          <Button
            transparent
            onPress={() => {
              //TODO:
            }}
          >
            <EntypoIcon name="magnifying-glass" />
          </Button>
          <Button
            transparent
            onPress={() => {
              //FIXME: onPress 수정
              // props.navigation.navigate("DiaryMemoView", { value: "hi" });
            }}
          >
            <EntypoIcon name="plus" />
          </Button>
        </Right>
      </Header>
      <Content>
        <List>{makeDiaryList(stateDiaryList)}</List>
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
    diaryDataReqHandler: () => {
      dispatch(reqDiaryData());
    },
    diaryListSaveHandler: () => {
      dispatch(saveDiaryList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);
