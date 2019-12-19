import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
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
import EntypoIcon from "react-native-vector-icons/Entypo";
import _ from "lodash";
//action
import { reqDiaryData, saveDiaryList } from "../actions/diaryAction";

//icon load
EntypoIcon.loadFont();

const DiaryScreen = props => {
  const {
    diaryDataList,
    diaryInfoToSave,
    diaryInfoToDelete,
    isLoading
  } = props.diaryReducerInfo; // 일지 리스트
  const [stateDiaryList, setStateDiaryList] = useState([]);
  // 일지 리스트 생성
  const makeDiaryListComponent = diaryDataList => {
    return _.map(diaryDataList, diaryDataInfo => {
      return (
        <ListItem
          onPress={() => {
            // 네비게이션 stack에 클릭한 일지 내용 전달
            props.navigation.navigate("DiaryUpdateScreen", {
              seq: diaryDataInfo.seq,
              writedate: diaryDataInfo.writedate,
              content: diaryDataInfo.content
            });
          }}
        >
          <Body>
            {/* <Text>{diaryDataInfo.seq}</Text> */}
            <Text style={styles.listHeader}>{diaryDataInfo.writedate}</Text>
            <Text style={styles.listContent}>{diaryDataInfo.content}</Text>
          </Body>
        </ListItem>
      );
    });
  };
  const [refreshing, setRefreshing] = useState(false);

  // 로딩 상태 변경
  useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);
  //일지 정보 요청
  useEffect(() => {
    props.handleDiaryDataReq();
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
            source={require("../../img/s2w_logo.png")}
          ></Thumbnail>
        </Left>
        <Body>
          <Text>Diary</Text>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              props.navigation.navigate("DiaryAddScreen");
            }}
          >
            <EntypoIcon name="plus" />
          </Button>
        </Right>
      </Header>
      <SafeAreaView style={styles.container}>
        <ScrollView
          bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              enabled={false}
            ></RefreshControl>
          }
        >
          <List>{makeDiaryListComponent(stateDiaryList)}</List>
        </ScrollView>
      </SafeAreaView>
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
    handleDiaryDataReq: () => {
      dispatch(reqDiaryData());
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listHeader: {
    color: "gray",
    marginBottom: 20
  },
  listContent: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);
