import React, { useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Right,
  Button,
  Left,
  Row,
  Col,
  Card,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import Picker from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import EntypoIcon from "react-native-vector-icons/Entypo";
//action
import { changeSearchInfo } from "../../actions/upsas/trendSearchAction";

EntypoIcon.loadFont();

const SearchScreen = props => {
  const {
    searchType,
    searchInterval,
    strStartDateInputValue,
    strEndDateInputValue
  } = props.searchInfo;
  const [stateSearchType, setStateSearchType] = useState(searchType);
  const [stateSearchInterval, setStateSearchInterval] = useState(
    searchInterval
  );
  const [
    stateStrStartDateInputValue,
    setStateStrStartDateInputValue
  ] = useState(strStartDateInputValue);
  const [stateStrEndDateInputValue, setStateStrEndDateInputValue] = useState(
    strEndDateInputValue
  );
  const searchTypeItems = [
    {
      label: "일일",
      value: "days"
    },
    {
      label: "기간 선택",
      value: "range"
    }
  ];

  const searchIntervalItems = [
    {
      label: "1시간",
      value: "hour"
    },
    {
      label: "1분",
      value: "min"
    },
    {
      label: "10분",
      value: "min10"
    }
  ];

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text>취소</Text>
          </Button>
        </Left>
        <Body></Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              props.handleSearchInfoChange({
                searchType: stateSearchType,
                searchInterval: stateSearchInterval,
                strStartDateInputValue: stateStrStartDateInputValue,
                strEndDateInputValue: stateStrEndDateInputValue
              });
              props.navigation.goBack();
            }}
          >
            <Text>검색</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text>조회기간</Text>
          </CardItem>
          <CardItem>
            <Picker
              placeholder
              style={pickerStyle}
              value={stateSearchType}
              items={searchTypeItems}
              onValueChange={searchTypeVal => {
                setStateSearchType(searchTypeVal);
              }}
              Icon={() => {
                return <EntypoIcon name="chevron-down"></EntypoIcon>;
              }}
            ></Picker>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>조회간격</Text>
          </CardItem>
          <CardItem>
            <Picker
              placeholder
              style={pickerStyle}
              value={stateSearchInterval}
              items={searchIntervalItems}
              onValueChange={searchIntervalVal => {
                setStateSearchInterval(searchIntervalVal);
              }}
              Icon={() => {
                return <EntypoIcon name="chevron-down"></EntypoIcon>;
              }}
            ></Picker>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>{stateSearchType == "range" ? "시작날짜" : "날짜"}</Text>
          </CardItem>
          <CardItem>
            <DatePicker
              date={stateStrStartDateInputValue}
              locale="ko"
              cancelBtnText=""
              confirmBtnText="확인"
              onDateChange={startDate => {
                setStateStrStartDateInputValue(startDate);
              }}
            ></DatePicker>
          </CardItem>
        </Card>
        <Card
          style={stateSearchType == "range" ? styles.showCard : styles.hideCard}
        >
          <CardItem header bordered>
            <Text>종료날짜</Text>
          </CardItem>
          <CardItem>
            <DatePicker
              date={stateStrEndDateInputValue}
              minDate={stateStrStartDateInputValue}
              locale="ko"
              cancelBtnText=""
              confirmBtnText="확인"
              onDateChange={endDate => {
                setStateStrEndDateInputValue(endDate);
              }}
            ></DatePicker>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchInfoChange: changedSearchInfo => {
      dispatch(changeSearchInfo(changedSearchInfo));
    }
  };
};

const pickerStyle = StyleSheet.create({
  inputIOS: {
    paddingRight: 15
  }
});

const styles = StyleSheet.create({
  showCard: {
    display: "flex"
  },
  hideCard: {
    display: "none"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
