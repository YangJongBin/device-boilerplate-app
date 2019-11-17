import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { LocaleConfig, Calendar } from "react-native-calendars";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Button,
  Thumbnail
} from "native-base";
import _ from "lodash";
//action
import { reqDiaryData, saveDiaryList } from "../../actions/upsas/diaryAction";

//icon load
EntypoIcon.loadFont();

const DiaryScreen = props => {
  const {
    diaryDataList,
    diaryInfoToSave,
    diaryInfoToDelete
  } = props.diaryReducerInfo; // 일지 리스트
  const [stateDiaryList, setStateDiaryList] = useState([]);

  // 일지 리스트 생성
  const makeDiaryList = diaryDataList => {
    return _.map(diaryDataList, diaryDataInfo => {
      return (
        <ListItem
          onPress={() => {
            // 네비게이션 stack에 클릭한 일지 내용 전달
            props.navigation.navigate("DiaryStackView", {
              seq: diaryDataInfo.seq,
              writedate: diaryDataInfo.writedate,
              content: diaryDataInfo.content
            });
          }}
        >
          <Body>
            <Text>{diaryDataInfo.seq}</Text>
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
  }, []);

  // 리스트 수정, 추가 떄마다 리스트를 갱신할 수 없으므로 state에 저장해서 관리 및 사용
  useEffect(() => {
    setStateDiaryList(diaryDataList);
  }, [diaryDataList]);

  // state에 저장된 일지 리스트 갱신 (갱신용)
  useEffect(() => {
    if (diaryInfoToSave) {
      const updatedDiaryList = _.map(stateDiaryList, stateDiaryInfo => {
        if (stateDiaryInfo.seq === diaryInfoToSave.seq) {
          stateDiaryInfo.content = diaryInfoToSave.content;
        }
        return stateDiaryInfo;
      });

      // 일지 리스트 추가와 갱신을 구분하는 조건문
      // FIXME: 조건 에매함 오류 가능성 열어둬야함..
      if (!diaryInfoToSave.seq) {
        diaryInfoToSave.seq = _.head(updatedDiaryList).seq + 1;
        updatedDiaryList.unshift(diaryInfoToSave);
      }

      setStateDiaryList(updatedDiaryList);
    }
  }, [diaryInfoToSave]);

  // state에 저장된 일지 리스트 갱신 (삭제용)
  useEffect(() => {
    if (diaryInfoToDelete) {
      const updatedDiaryList = _.filter(stateDiaryList, stateDiaryInfo => {
        if (stateDiaryInfo.seq === diaryInfoToDelete.seq) {
          return false;
        }
        return stateDiaryInfo;
      });

      setStateDiaryList(updatedDiaryList);
    }
  }, [diaryInfoToDelete]);

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
          {/* <Button
            transparent
            onPress={() => {
              //TODO:
            }}
          >
            <EntypoIcon name="magnifying-glass" />
          </Button> */}
          <Button
            transparent
            onPress={() => {
              //FIXME: onPress 수정
              props.navigation.navigate("DiaryAddStackView");
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
