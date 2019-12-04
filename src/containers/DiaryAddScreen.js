import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import {
  Container,
  Content,
  Header,
  Right,
  Body,
  Button,
  Footer,
  Row
} from "native-base";
import moment from "moment";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-picker";
import fs from "react-native-fs";
import _ from "lodash";
//action
import { saveDiaryInfo } from "../actions/diaryAction";
// load icon
EntypoIcon.loadFont();

const DiaryMemoView = props => {
  const [stateDiaryContent, setStateDiaryContent] = useState("");
  const [imageSourceList, setImageSourceList] = useState([]);

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
  const setSaveButton = (writedate, content) => (
    <Button
      transparent
      onPress={() => {
        props.diarySaveHandler({ writedate, content, imageSourceList });
        props.navigation.goBack();
      }}
    >
      <Text>완료</Text>
    </Button>
  );

  // 갤러리에서 선택된 사진을 토대로 image component 생성
  const makeImageListComponet = imageSourceList => {
    return _.map(imageSourceList, imageSource => {
      return <Image source={{ uri: imageSource }} style={styles.image}></Image>;
    });
  };

  return (
    <Container>
      <Header>
        <Body style={styles.headerBody}>
          <Text style={styles.headerText}>{moment().format("YYYY-MM-DD")}</Text>
        </Body>
        <Right>
          {stateDiaryContent == ""
            ? setDownButton()
            : setSaveButton(moment().format("YYYY-MM-DD"), stateDiaryContent)}
        </Right>
      </Header>
      <Content padder>
        <TextInput
          multiline={true}
          placeholder="여기에 내용을 적어주세요."
          multiline={true}
          onChangeText={value => {
            setStateDiaryContent(value);
          }}
        ></TextInput>
      </Content>
      {/* FIXME: style 수정 */}
      <View
        style={{
          flex: 0.1
        }}
      >
        <Row>{makeImageListComponet(imageSourceList)}</Row>
      </View>
      <Footer style={styles.footer}>
        {/* FIXME: 버튼 정렬을 위한 임시 flex */}
        <Body style={{ flex: 6 }}></Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              // // FIXME: 갤러리 연동 기능
              // ImagePicker.launchImageLibrary("", res => {
              //   if (!res.didCancel) {
              //     setImageSourceList([...imageSourceList].concat(res.uri));
              //   }
              // });
              alert("준비중입니다.");
            }}
          >
            <EntypoIcon name="folder-images"></EntypoIcon>
          </Button>
        </Right>
        <Right>
          <Button
            transparent
            onPress={() => {
              // TODO: 카메라 연동 기능
              alert("준비중입니다.");
            }}
          >
            <EntypoIcon name="camera"></EntypoIcon>
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
  imageListFooter: {
    backgroundColor: "red"
  },
  footer: {
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderTopWidth: 0
  },
  image: {
    flex: 0.2,
    resizeMode: "contain",
    margin: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryMemoView);
